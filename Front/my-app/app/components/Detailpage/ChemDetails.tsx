import { buildChemDetailsQuery } from "@/app/utils/compoundBuilderQuery";
import { fetchSample } from "@/app/utils/fetch";

type ChemProps = { id: string };

export type ChemDataItem = {
  shortLabel: { value: string };
  value?: { value: string };
};

export default async function ChemDetails({ id }: ChemProps) {
  const query = buildChemDetailsQuery(id);
  const data: ChemDataItem[] = await fetchSample(query);

  const cleanLabel = (raw: string) => raw.replace(/^v2/, "");

  return (
    <div className="mx-auto border rounded-md mt-5 p-5">
      <h3 className="text-2xl mb-5">Chemical Details</h3>

      <div className="grid grid-cols-2 gap-y-2">
        {data.map((row) => (
          <>
            <p className="font-medium">{cleanLabel(row.shortLabel.value)}</p>
            <p>{row.value?.value ?? "-"}</p>
          </>
        ))}
      </div>
    </div>
  );
}
