import Overview from "./Overview";
import References from "./References";

function Wrapper() {
    return <div className="w-[80vw] mx-auto border rounded-md p-5">
        <h3 className="pb-4"> Component common Name</h3>

        <Overview />
        <References />

    </div>;
}

export default Wrapper;