import { useState } from "react";
import {SimpleBinding } from "../utils/interfaces";


export function ResultBox({ data }: { data: SimpleBinding[] }) {

  const [page, setPage] = useState(1);
  const pageSize = 20;

  const totalPages = Math.ceil(data.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const pageData = data.slice(start, end);

  function prev() {
    if (page > 1) setPage(page - 1);
  }

  function next() {
    if (page < totalPages) setPage(page + 1);
  }


  
  return (
    <div className="flex justify-center">
      <div className="border rounded-md overflow-hidden w-[85%]">
        <div className="flex font-bold">
          <div className="flex-1 px-4 py-2">Compound</div>
          <div className="flex-1 px-4 py-2">Common Name</div>
          <div className="flex-1 px-4 py-2">SMILES</div>
        </div>

        <div className="flex flex-col gap-2 p-2">
          {pageData.map((item, i) => (
            <div key={i} className="flex border rounded-md transition-colors hover:bg-green-100 cursor-pointer active:bg-green-200">
              <div className="w-1/3 px-4 py-2">{item.compound}</div>
              <div className="w-1/3 px-4 py-2">{item.commonName}</div>
              <div className="w-1/3 px-4 py-2 break-words">{item.smiles}</div>
            </div>
          ))}
        </div>
             {totalPages > 1 && (
          <div className="flex justify-between p-3">
            <button
              className="px-3 py-1 bg-green-700 text-white rounded disabled:opacity-50"
              onClick={prev}
              disabled={page === 1}
            >
              Prev
            </button>

            <div className="px-2 py-1">
              {page} / {totalPages}
            </div>

            <button
              className="px-3 py-1 bg-green-700 text-white rounded disabled:opacity-50"
              onClick={next}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultBox;
