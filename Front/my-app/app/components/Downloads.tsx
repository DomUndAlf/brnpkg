import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { SimpleBinding } from "../utils/interfaces";
import { downloadCSV, downloadSDF } from "../utils/csv";

interface DownloadsProps {
  results: SimpleBinding[];
}

function Downloads({ results }: DownloadsProps) {
    return(
        <div className="flex justify-center">
        <div className="m-10 p-5 border rounded-md flex flex-col gap-6 overflow-hidden w-[85%]">
            <h3 className="text-lg">Downloads</h3>
            <div className="flex justify-center gap-5 mt-4">
                <Button className="bg-green-700 p-5 text-white"  onClick={() => downloadCSV(results) }><Download />CSV</Button>
                <Button className="bg-green-700 p-5 text-white" onClick={() => downloadSDF(results)}><Download />SDF (R-CDK)</Button>
                <Button className="bg-green-700 p-5 text-white"><Download />.mol2</Button>
            </div>
        </div>
        </div>
    );
}

export default Downloads;