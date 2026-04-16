"use client";

import { downloadCSV, downloadSDF } from "@/app/utils/csv";
import { SimpleBinding } from "@/app/utils/interfaces";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type DownloadProps = { 
    data: SimpleBinding[];
 };

function DetDownloads({ data }: DownloadProps) {
    return(
        <div className="mt-5 border rounded-md flex flex-col gap-6">
            <h3 className="text-2xl mt-5 ml-5">Downloads</h3>
            <div className="flex m-5 justify-center gap-5 mt-4">
                <Button className="bg-green-700 p-5 text-white"  onClick={() => downloadCSV(data)}><Download />CSV</Button>
                <Button className="bg-green-700 p-5 text-white" onClick={() => downloadSDF(data) }><Download />SDF (R-CDK)</Button>
                <Button className="bg-green-700 p-5 text-white"><Download />.mol2</Button>
            </div>
        </div>
    );
}

export default DetDownloads;