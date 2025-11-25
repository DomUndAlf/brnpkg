import { FlaskConical } from "lucide-react";
import HBondA from "./Sliders/hBondA";
import HBondD from "./Sliders/hBondD";
import Lipinski from "./Sliders/Lipinski";
import MolMass from "./Sliders/MolarMass";
import MonoIsoMass from "./Sliders/MonoIsoMass";
import CLogP from "./Sliders/cLogP";
import TPSA from "./Sliders/TPSA";
import RotableBonds from "./Sliders/RotableBonds";


function ChemInfo() {
        return (
    <div className="grid gap-5 m-10 p-5 border rounded-md">
        <div className="flex items-center gap-2">
            <FlaskConical />
            <h3 className="text-lg">Chemical Information</h3>
        </div>
    <div className="place-items-center grid gap-2">
        <MolMass />
        <HBondA />
        <HBondD />
        <Lipinski />
        <MonoIsoMass />
        <CLogP />
        <TPSA />
        <RotableBonds />
        </div>
    </div>
    );
}

export default ChemInfo;