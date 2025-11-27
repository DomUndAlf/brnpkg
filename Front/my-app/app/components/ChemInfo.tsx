import { FlaskConical } from "lucide-react";
import HBondA from "./Sliders/hBondA";
import HBondD from "./Sliders/hBondD";
import Lipinski from "./Sliders/Lipinski";
import MolMass from "./Sliders/MolarMass";
import MonoIsoMass from "./Sliders/MonoIsoMass";
import CLogP from "./Sliders/cLogP";
import TPSA from "./Sliders/TPSA";
import RotableBonds from "./Sliders/RotableBonds";

interface ChemProps {
  onMolChange:  (value: [number | null, number | null]) => void;
  onAcceptChange:  (value: [number | null, number | null]) => void;
  onDonorChange:  (value: [number | null, number | null]) => void;
  onLipinskiChange:  (value: [number | null, number | null]) => void;
  onMonoIsoChange:  (value: [number | null, number | null]) => void;
  onCLogPChange:  (value: [number | null, number | null]) => void;
  onTpsaChange:  (value: [number | null, number | null]) => void;
  onRotableChange:  (value: [number | null, number | null]) => void;
}

function ChemInfo({onMolChange, onAcceptChange, onDonorChange, onLipinskiChange, onMonoIsoChange, onCLogPChange, onTpsaChange, onRotableChange}: ChemProps) {
        return (
    <div className="grid gap-5 m-10 p-5 border rounded-md">
        <div className="flex items-center gap-2">
            <FlaskConical />
            <h3 className="text-lg">Chemical Information</h3>
        </div>
    <div className="place-items-center grid gap-2">
        <MolMass onChange={onMolChange}/>
        <HBondA onChange={onAcceptChange}/>
        <HBondD onChange={onDonorChange}/>
        <Lipinski onChange={onLipinskiChange}/>
        <MonoIsoMass onChange={onMonoIsoChange} />
        <CLogP onChange={onCLogPChange}/>
        <TPSA onChange={onTpsaChange}/>
        <RotableBonds onChange={onRotableChange} />
        </div>
    </div>
    );
}

export default ChemInfo;