import { fetchSample } from "@/app/utils/fetch";
import ChemDetails from "./ChemDetails";
import DetDownloads from "./DetDownloads";
import Molecule from "./Molecule/Molecule";
import Overview from "./Overview";
import References from "./References/References";
import { smilesFromIDQuery } from "@/app/utils/compoundBuilderQuery";
import { SimpleBinding } from "@/app/utils/interfaces";

type WrapperProps = {
  id: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toSimpleBinding(row: any): SimpleBinding {
  return {
    compound: row?.compound?.value ?? '',
    commonName: row?.commonName?.value ?? '',
    smiles: row?.smiles?.value ?? ''
  };
}

export default async function Wrapper({ id }: WrapperProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = await fetchSample(smilesFromIDQuery(id));

const simpleArray: SimpleBinding[] = raw?.map(toSimpleBinding) ?? [];
const smiles = simpleArray[0]?.smiles ?? null;

  return (
    <div className="w-[80vw] mx-auto mt-10 p-5">
      <h3 className="pb-4 text-3xl">Compound Information</h3>

      <Overview id={id} />
      <References id={id} />

      {smiles ? <Molecule smiles={smiles} /> : null}

       <ChemDetails id={id} />
       <DetDownloads data={simpleArray} />
    </div>
  );
}