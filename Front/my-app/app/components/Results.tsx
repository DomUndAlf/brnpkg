import {SimpleBinding } from "../utils/interfaces";


export function ResultBox({ data }: { data: SimpleBinding[] }) {
  return (
    <div className="flex justify-center">
      <div className="border rounded-md overflow-hidden">
        <div className="flex font-bold">
          <div className="flex-1 px-4 py-2">Common Name</div>
          <div className="flex-1 px-4 py-2">SMILES</div>
        </div>

        <div className="flex flex-col gap-2 p-2">
          {data.map((item, i) => (
            <div key={i} className="flex border rounded-md">
              <div className="flex-1 px-4 py-2">{item.commonName}</div>
              <div className="flex-1 px-4 py-2">{item.smiles}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResultBox;
