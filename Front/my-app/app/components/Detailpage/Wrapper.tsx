
import Molecule from "./Molecule";
import Overview from "./Overview";
import References from "./References";

function Wrapper() {
    return <div className="w-[80vw] mx-auto border rounded-md p-5">
        <h3 className="pb-4 text-3xl"> Component common Name</h3>

        <Overview />
        <References />
        <Molecule />
 
    </div>;
}

export default Wrapper;