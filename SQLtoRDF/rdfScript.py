from sshtunnel import SSHTunnelForwarder
import mysql.connector
from rdflib import SKOS, Graph, Namespace, Literal, RDF, RDFS, OWL, XSD, URIRef
from rdkit import Chem
from rdkit.Chem import Descriptors, Crippen, Lipinski, rdMolDescriptors
from habanero import Crossref
from urllib.parse import quote
from habanero import Crossref
import requests
from requests.utils import requote_uri
from bs4 import BeautifulSoup
from urllib.parse import quote
import yaml

cr = Crossref()

# --- Config laden --- #
with open("config.yaml") as f:
    config = yaml.safe_load(f)

ssh_conf = config["ssh_tunnel"]
db_conf = config["mysql"]

# --- Namespaces ---
ONTO = Namespace("http://nubbekg.aksw.org/ontology#")
DATA = Namespace("http://nubbekg.aksw.org/v2/data/")

PATHWAY = Namespace("http://nubbekg.aksw.org/data/v2/pathway/")

RDFS_NS = RDFS
OWL_NS = OWL

# --- Mapping-Definition ---

#Mapping von Werten aus der RDB zu RDF-Klassen und -Eigenschaften
mappings = {
    ###IDs aus Datenbank
    "Bioactivity": {
        "query": "SELECT biological_property_id AS bioactivity, property_name AS bioactivity_label FROM biological_property;",
        "mapping": {"bioactivity": (ONTO.Bioactivity, OWL.Class),
                    "bioactivity_label": (RDFS.label, XSD.string)
                    }
    },
    "State": {
        "query": "SELECT state_id_ibge, state FROM location_state;",
        "mapping": {"state_id_ibge": (ONTO.State, OWL.Class),
                    "state": (RDFS.label, XSD.string)}
    },
    "City": {
        "query": "SELECT city_id_ibge, city FROM location_city;",
        "mapping": {"city_id_ibge": (ONTO.City, OWL.Class),
                    "city": (RDFS.label, XSD.string),
                    }
    },
    "Reference": {
        "query": "SELECT reference_id FROM reference;",
        "mapping": {
            "reference_id": (ONTO.Reference, OWL.Class),  # erzeugt Reference-Instanz
        }
    },
     "Publication": {
         "query": "SELECT reference_id, doi FROM reference;",
         "mapping": {
             "reference_id": (ONTO.Publication, OWL.Class),
             "doi": (ONTO.doi, XSD.string)
         },
     },
    "Compound": {
        "query": """SELECT compound.brnpdb_id, compound.smiles, compound_name.common_name
                    FROM compound
                    JOIN compound_name ON compound.brnpdb_id = compound_name.brnpdb_id;""",
        "mapping": {
            "brnpdb_id": (ONTO.Compound, OWL.Class),
            "smiles": (ONTO.smiles, XSD.string),
            "common_name": (ONTO.commonName, XSD.string)
        },
    },
    "Analysis": {
        "query": """
        SELECT analysis_id, location_id, city_id, species_id_col, species_id_col2, brnpdb_id,
               biological_property_id AS bioactivity, reference_id
        FROM analysis;
    """,
        "mapping": {
            "analysis_id": (ONTO.Analysis, OWL.Class),                  # Analysis-Instanz
            "analysis_id_specimen": (ONTO.aboutSpecimen, "specimen_{analysis_id}"),
            "brnpdb_id": (ONTO.discovered, "ref"),
            "bioactivity": (ONTO.hasBioAssay, "ref"),
            "reference_id": (ONTO.reference, "ref")
        }
    },
    "Species": {
        "query": "SELECT species_id, species_name, taxon_id_col FROM species;",
        "mapping": {
            "species_id": (ONTO.Species, OWL.Class),
            "species_name": (RDFS.label, XSD.string),
            "taxon_id_col": (SKOS.notation, XSD.string)
        }
    },
    "UniqueIdentifiers": {
        "query": "SELECT brnpdb_id, inchikey, inchi, iupac_name FROM compound;",
        "mapping": {
            "brnpdb_id": (ONTO.UniqueIdentifiers, OWL.Class),
            "inchikey": (ONTO.inchikey, XSD.string),
            "inchi": (ONTO.inchi, XSD.string),
            "iupac_name": (ONTO.iupacName, XSD.string), 
        },
    },
    
"MetabolicClass": {
    "query": "SELECT brnpdb_id, superclass, class, pathway FROM metabolic_class;",
    "mapping": {
        "brnpdb_id": (ONTO.MetabolicClass, "mc_{class}_{brnpdb_id}"),     # Instanz je Compound/Klasse
        "class": (RDFS.label, XSD.string),
        "superclass": (ONTO.hasSuperclass, "mc_super_{superclass}"),
        "pathway": (ONTO.hasPathway, "mc_path_{pathway}")
    }
},
        
    #virtuelle Knoten
"Specimen": {
    "query": """
        SELECT 
            analysis.analysis_id AS specimen_id,
            natural_resource.natural_resource AS sample_type,
            analysis.species_id_col AS species_1,
            analysis.species_id_col2 AS species_2,
            analysis.location_id,
            analysis.city_id
        FROM analysis
        LEFT JOIN natural_resource 
          ON natural_resource.natural_resource_id = analysis.natural_resource_id;
    """,
    "mapping": {
        "specimen_id": (ONTO.Specimen, "specimen_{specimen_id}"), # rdf:type
        "sample_type": (ONTO.sampleType, XSD.string),            # Literal
        "species_1": (ONTO.partOfSpecies, "ref"),               # Species
        "species_2": (ONTO.partOfSpecies, "ref"),               # Species
        "location_id": (ONTO.discoveredIn, "ref"),              # State
        "city_id": (ONTO.discoveredIn, "ref")                   # City
    }
},
"Assay": {
    "query": "SELECT analysis_id, biological_property_id AS bioactivity FROM analysis;",
    "mapping": {
        "analysis_id": (ONTO.Assay, "assay_{analysis_id}"),
        "bioactivity": (ONTO.bioactivity, "ref")
    }
},

    "Descriptors": {
        "query": "SELECT brnpdb_id, smiles FROM compound;",
        "mapping": {
            "brnpdb_id": (ONTO.Descriptors, OWL.Class),  # Instanz pro Compound
            # die konkreten Descriptoren als Literale kommen über calc_descriptors(smiles)
        }
    }   
}

descriptor_classes = {
    "logpCoefficient": ONTO.ConstitutionalDescriptor,
    "lipinskiRuleOf5Failures": ONTO.ConstitutionalDescriptor,
    "tpsa": ONTO.TopologicalDescriptor,
    "hBondDonorCount": ONTO.ElectronicDescriptor,
    "hBondAcceptorCount": ONTO.ElectronicDescriptor,
    "monoisotopicMass": ONTO.MolecularDescriptor,
    "molecularFormula": ONTO.MolecularDescriptor,
    "molecularWeight": ONTO.MolecularDescriptor,
    "molecularVolume": ONTO.MolecularDescriptor,
    "nrotb": ONTO.TopologicalDescriptor,
}

# Funktion zur Berechnung der Deskriptoren mit RDKit aus SMILES
def calc_descriptors(smiles):
     mol = Chem.MolFromSmiles(smiles)
     if not mol:
         if not mol:
             print("❌ Ungültiger SMILES:", smiles)
             return None
     return {
         "logpCoefficient": Crippen.MolLogP(mol),
         "lipinskiRuleOf5Failures": int(
             (Lipinski.NumHDonors(mol) > 5)
             + (Lipinski.NumHAcceptors(mol) > 10)
             + (Descriptors.MolWt(mol) > 500)
             + (Crippen.MolLogP(mol) > 5)
         ),
         "tpsa": Descriptors.TPSA(mol),
         "monoisotopicMass": Descriptors.ExactMolWt(mol),
         "molecularFormula": rdMolDescriptors.CalcMolFormula(mol),
         "molecularWeight": Descriptors.MolWt(mol),
         "molecularVolume": Descriptors.MolMR(mol),
         "nrotb": Lipinski.NumRotatableBonds(mol),
         "hBondDonorCount": Lipinski.NumHDonors(mol),
         "hBondAcceptorCount": Lipinski.NumHAcceptors(mol),
     }

# --- RDF-Graph ---
g = Graph()
g.bind("nubbekg", ONTO)
g.bind("data", DATA)
g.bind("rdfs", RDFS_NS)
g.bind("owl", OWL_NS)

# --- SSH-Tunnel & MySQL-Verbindung ---
with SSHTunnelForwarder(
    (ssh_conf["host"], ssh_conf["port"]),
    ssh_username=ssh_conf["ssh_username"],
    ssh_password=ssh_conf["ssh_password"],
    remote_bind_address=(
        ssh_conf["remote_bind_address"]["host"],
        ssh_conf["remote_bind_address"]["port"]
    )
) as tunnel:
    tunnel.start()
    print("✅ Tunnel läuft auf Port:", tunnel.local_bind_port)


    print("verbinde mit sql")
    conn = mysql.connector.connect(
        host=db_conf["host"],
        port=tunnel.local_bind_port,
        user=db_conf["user"],
        password=db_conf["password"],
        database=db_conf["database"]
    )
    print("✅ MySQL verbunden")
    cursor = conn.cursor(dictionary=True)

    def chunk_list(lst, size):
        for i in range(0, len(lst), size):
            yield lst[i:i+size]
        
    # --- BULK DOIs sammeln ---
    print("Sammle DOIs für Crossref…")
    cursor.execute("SELECT reference_id, doi FROM reference WHERE doi IS NOT NULL AND doi != '';")
    doi_rows = cursor.fetchall()

    doi_map = {row["doi"]: row["reference_id"] for row in doi_rows}
    dois = list(doi_map.keys())

    # --- BULK Crossref Request ---
    crossref_results = {}

    print("Anfrage an Crossref…")
    for chunk in chunk_list(dois, 50):
        for doi in chunk:
            try:
                r = requests.get(
                    f"https://api.crossref.org/works/{quote(doi)}",
                    timeout=10
                )
                r.raise_for_status()
                item = r.json()["message"]
                crossref_results[doi] = item
            except:
                continue

    print(f"✅ {len(crossref_results)} Publikationen aus Crossref geladen")

    # --- Klassen, Literale und ObjectProperties einfügen ---
    cursor.execute(mappings['Assay']['query'])
    for row in cursor.fetchall():
        assay_uri = DATA[f"assay_{row['analysis_id']}"]
        g.add((assay_uri, RDF.type, ONTO.Assay))

        bioactivity_id = row['bioactivity']
        if bioactivity_id:
            g.add((assay_uri, ONTO.bioactivity, DATA[f"bioactivity_{bioactivity_id}"]))
    
    for table, info in mappings.items():
        cursor.execute(info['query'])
        rows = cursor.fetchall()
        for row in rows:
            qrow = {k: quote(str(v)) for k, v in row.items()}

            # Subject URI
            id_key = None
            for k, (p, d) in info['mapping'].items():
                if d == OWL.Class or (isinstance(d, str) and '{' in d):
                    id_key = k
                    break
            if id_key is None:
                id_key = list(info['mapping'].keys())[0]

            first_map = info['mapping'][id_key]
            if isinstance(first_map[1], str) and '{' in first_map[1]:
                subject_uri = DATA[first_map[1].format(**qrow)]
            else:
                subject_uri = DATA[f"{table.lower()}_{quote(str(row[id_key]))}"]

            # --- Crossref Daten einfügen ---
            if table == "Publication":
                doi = row.get("doi")
                pub_uri = subject_uri

                if doi in crossref_results:
                    cr_item = crossref_results[doi]

                    title = cr_item.get("title", [""])[0]
                    year = (
                        cr_item.get("issued", {}).get("date-parts", [[None]])[0][0] or
                        cr_item.get("published-print", {}).get("date-parts", [[None]])[0][0] or
                        cr_item.get("created", {}).get("date-parts", [[None]])[0][0]
                    )
                    publisher = cr_item.get("publisher", "")
                    pages = cr_item.get("page", "")
                    abstract = BeautifulSoup(cr_item.get("abstract", ""), "lxml").text
                    volume = cr_item.get("volume", "")
                    issue = cr_item.get("issue") or cr_item.get("journal-issue", {}).get("issue")
                    periodicMagazine = cr_item.get("container-title", [""])[0]


                    if title:
                        g.add((pub_uri, ONTO.title, Literal(title)))
                    if year:
                        g.add((pub_uri, ONTO.publicationYear, Literal(year, datatype=XSD.gYear)))
                    if publisher:
                        g.add((pub_uri, ONTO.publisher, Literal(publisher)))
                    if pages:
                        g.add((pub_uri, ONTO.pages, Literal(pages)))
                    if abstract:
                        g.add((pub_uri, ONTO.abstract, Literal(abstract)))
                    if volume:
                        g.add((pub_uri, ONTO.volume, Literal(volume)))
                    if issue:
                        g.add((pub_uri, ONTO.issue, Literal(issue)))
                    if periodicMagazine:
                        g.add((pub_uri, ONTO.periodicMagazine, Literal(periodicMagazine)))

                        
            # Mappings anwenden
            for col, (onto_prop, datatype) in info['mapping'].items():
                value = row.get(col)
                if value is None:
                    continue

                if datatype == OWL.Class:
                    g.add((subject_uri, RDF.type, onto_prop))
                    continue

                if datatype == "ref":
                    ref_uri = None
                    if table == "Analysis":
                        if col == "brnpdb_id":
                            ref_uri = DATA[f"compound_{value}"]
                        elif col == "reference_id":
                            ref_uri = DATA[f"reference_{value}"]
                        elif col == "bioactivity":
                            ref_uri = DATA[f"assay_{row['analysis_id']}"]
                    elif table == "Specimen":
                        if col in ("species_1", "species_2"):
                            ref_uri = DATA[f"species_{value}"]
                        elif col == "location_id":
                            ref_uri = DATA[f"state_{value}"]
                        elif col == "city_id":
                            ref_uri = DATA[f"city_{value}"]

                    if ref_uri:
                        g.add((subject_uri, onto_prop, ref_uri))
                    continue

                if isinstance(datatype, str) and '{' in datatype:
                    inst_uri = DATA[datatype.format(**qrow)]
                    g.add((inst_uri, RDF.type, onto_prop))
                    continue

                g.add((subject_uri, onto_prop, Literal(value, datatype=datatype)))

            # --- aboutSpecimen für Analysis setzen ---
            if table == "Analysis":
                specimen_uri = DATA[f"specimen_{row['analysis_id']}"]
                g.add((subject_uri, ONTO.aboutSpecimen, specimen_uri))
                
    # --- Metabolic Classes ---
    cursor.execute("SELECT superclass, class, pathway FROM metabolic_class;")
    for row in cursor.fetchall():
        superclass = row['superclass']
        class_ = row['class']
        pathway = row['pathway']

        # skip leere Klassen
        if not class_:
            continue

        class_uri = DATA[f"mc_{quote(class_)}"]
        g.add((class_uri, RDF.type, ONTO.MetabolicClass))
        
        if class_:
            class_uri = DATA[f"mc_{quote(class_)}"]
            g.add((class_uri, RDF.type, ONTO.MetabolicClass))
            g.add((class_uri, RDFS.label, Literal(class_)))

        if superclass:
            super_uri = DATA[f"mc_{quote(superclass)}"]
            g.add((super_uri, RDF.type, ONTO.MetabolicClass))
            g.add((super_uri, RDFS.label, Literal(superclass)))
            g.add((class_uri, RDFS.subClassOf, super_uri))

        if pathway:
            path_uri = DATA[f"pathway_{quote(pathway)}"]
            g.add((path_uri, RDF.type, ONTO.Pathway))
            g.add((path_uri, RDFS.label, Literal(pathway)))
            g.add((class_uri, ONTO.partOfMetabolicPathway, path_uri))


    # --- Compound → MetabolicClass ---
    cursor.execute("SELECT brnpdb_id, class FROM metabolic_class WHERE class IS NOT NULL;")
    for row in cursor.fetchall():
        if not row['class']:
            continue
        compound_uri = DATA[f"compound_{row['brnpdb_id']}"]
        class_uri = DATA[f"mc_{quote(row['class'])}"]
        g.add((compound_uri, ONTO.partOfMetabolicClass, class_uri))

  
    # --- Descriptors berechnen ---
    cursor.execute("SELECT brnpdb_id, smiles FROM compound;")
    for row in cursor.fetchall():
        smiles = row['smiles']
        brnpdb_id = row['brnpdb_id']

        compound_uri = DATA[f"compound_{brnpdb_id}"]
        descriptor_uri = DATA[f"descriptors_{brnpdb_id}"]
        unique_id_uri = DATA[f"uniqueIdentifiers_{brnpdb_id}"]

        # ObjectProperties setzen
        g.add((compound_uri, ONTO.hasDescriptors, descriptor_uri))
        g.add((compound_uri, ONTO.isIdentifiedBy, unique_id_uri))

        # Deskriptoren Literale
        descriptors = calc_descriptors(smiles)
        if descriptors:
            for desc_name, value in descriptors.items():
                desc_class = descriptor_classes.get(desc_name, ONTO.MolecularDescriptor)
                desc_inst_uri = DATA[f"{desc_name}_{brnpdb_id}"]
                g.add((desc_inst_uri, RDF.type, desc_class))
                g.add((descriptor_uri, ONTO.hasDescriptor, desc_inst_uri))
                g.add((desc_inst_uri, ONTO.hasValue, Literal(value, datatype=XSD.float if isinstance(value, float) else XSD.string)))

    cursor.close()
    conn.close()

    # --- Speichern ---
    output_file = "nubbe_data.ttl"
    g.serialize(destination=output_file, format="turtle")
    print(f"\n✅ RDF-Graph erfolgreich exportiert nach '{output_file}'")