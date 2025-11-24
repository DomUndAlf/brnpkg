
import ChemDetails from "./ChemDetails";
import DetDownloads from "./DetDownloads";
import Molecule from "./Molecule/Molecule";
import Overview from "./Overview";
import References from "./References/References";

function Wrapper() {
    return <div className="w-[80vw] mx-auto border rounded-md p-5">
        <h3 className="pb-4 text-3xl"> Component common Name</h3>
        <Overview />
        <References />
        {Molecule("FC(F)(F)C1=CC(NC2=C(C=CC=N2)C(=O)OC2OC(=O)C3=CC=CC=C23)=CC=C1")}
        <ChemDetails />
        <DetDownloads />
    </div>;
}

export default Wrapper;