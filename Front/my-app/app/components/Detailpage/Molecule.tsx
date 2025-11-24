import MoleculeStructure from "./MoleculeStructure";

function ExampleSVG() {
  const caffeine = "CN1C=NC2=C1C(=O)N(C(=O)N2C)";

  return (
    <div id="component-example-svg" className="container">
      <section className="hero">
        <div className="hero-body">
        </div>
      </section>
      <div className="columns is-desktop">
        <div className="column">
          <MoleculeStructure
            id="structure-example-svg-caffeine"
            structure={caffeine}
            width={350}
            height={300}
            svgMode
          />
        </div>
      </div>
    </div>
  );
}

export default ExampleSVG;