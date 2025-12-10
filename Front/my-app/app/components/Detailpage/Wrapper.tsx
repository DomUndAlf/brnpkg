import ChemDetails from "./ChemDetails";
import DetDownloads from "./DetDownloads";
import Molecule from "./Molecule/Molecule";
import Overview from "./Overview";
import References from "./References/References";

type WrapperProps = {
  id: string;
};

export default async function Wrapper({ id }: WrapperProps) {
  return (
    <div className="w-[80vw] mx-auto mt-10 p-5">
      <h3 className="pb-4 text-3xl">Compound Information</h3>

      <Overview id={id} />
      <References id={id} />

      {/* {data?.smiles?.value ? <Molecule smiles={data.smiles.value} /> : null} */}

       <ChemDetails id={id} />
      {/* <DetDownloads id={id/>  */}
    </div>
  );
}


