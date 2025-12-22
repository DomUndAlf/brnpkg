import { fetchSample } from "@/app/utils/fetch";
import ChemDetails from "./ChemDetails";
import DetDownloads from "./DetDownloads";
import Molecule from "./Molecule/Molecule";
import Overview from "./Overview";
import References from "./References/References";
import { smilesFromIDQuery } from "@/app/utils/compoundBuilderQuery";

type WrapperProps = {
  id: string;
};

export default async function Wrapper({ id }: WrapperProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await fetchSample(smilesFromIDQuery(id));
  const smiles: string = result?.[0]?.smiles?.value ?? null;

  return (
    <div className="w-[80vw] mx-auto mt-10 p-5">
      <h3 className="pb-4 text-3xl">Compound Information</h3>

      <Overview id={id} />
      <References id={id} />

      {smiles ? <Molecule smiles={smiles} /> : null}

       <ChemDetails id={id} />
      {/* <DetDownloads id={id/>  */}
    </div>
  );
}