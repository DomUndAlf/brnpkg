import ChemDetails from "./ChemDetails";
import DetDownloads from "./DetDownloads";
import Molecule from "./Molecule/Molecule";
import Overview from "./Overview";
import References from "./References/References";

type WrapperProps = {
  id: string;
  data: unknown; // später typisieren, jetzt egal
};

function Wrapper({ id, data }: WrapperProps) {
  return (
    <div className="w-[80vw] mx-auto border rounded-md p-5">
      <h3 className="pb-4 text-3xl">Compound {id}</h3>

      <Overview data={data} />
      <References data={data} />

      {data?.smiles?.value ? <Molecule smiles={data.smiles.value} /> : null}

      <ChemDetails data={data} />
      <DetDownloads id={id} data={data} />
    </div>
  );
}

export default Wrapper;
