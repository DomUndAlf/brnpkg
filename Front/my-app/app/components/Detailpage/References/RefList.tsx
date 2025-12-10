

export type ReferenceData = {
  doi?: { value: string };
  species?: { value: string };
  bioactivity?: { value: string };
  state?: { value: string };
  city?: { value: string };
};

type RefItemsProps = {
  refData: ReferenceData;
};

function RefItem({ refData }: RefItemsProps) {

  return (
    <div className="mx-auto m-1 border rounded-md p-4 transition-colors hover:bg-green-100 cursor-pointer active:bg-green-200">
      <div className="grid grid-cols-5 gap-20">
      <span> {refData.doi?.value ?? "-"}</span>
      <span> {refData.bioactivity?.value ?? "-"}</span>
      <span> {refData.species?.value ?? "-"} </span>
      <span> {refData.state?.value ?? "-"} </span>
      <span> {refData.city?.value ?? "-"} </span>
      </div>
    </div>
  )
}

export default RefItem;