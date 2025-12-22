'use client';

import { useState } from "react";
import RefDetails from "./RefDetails";

export type ReferenceData = {
  doi?: { value: string };
  species?: { value: string };
  taxonId?: { value: string };
  bioactivity?: { value: string };
  state?: { value: string };
  city?: { value: string };
};

type RefItemsProps = {
  refData: ReferenceData;
};


function RefItem({ refData }: RefItemsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto m-1 border rounded-md p-4 transition-colors hover:bg-green-100 cursor-pointer active:bg-green-200" onClick={() => setOpen(!open)}>
      <div className="grid grid-cols-5 gap-20">
      <span className="break-all"> {refData.doi?.value ?? "-"}</span>
      <span> {refData.bioactivity?.value ?? "-"}</span>
      <span className=" text-green-700" onClick={() => window.open("https://www.catalogueoflife.org/data/taxon/" + refData.taxonId?.value, "_blank")}> {refData.species?.value ?? "-"} </span>
      <span> {refData.state?.value ?? "-"} </span>
      <span> {refData.city?.value ?? "-"} </span>
      </div>
          {open && <RefDetails doi={refData.doi?.value ?? "no publication info available"} />}
    </div>
  )
}

export default RefItem;