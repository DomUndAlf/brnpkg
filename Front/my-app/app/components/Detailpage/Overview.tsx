import { buildMetabolicClassQuery } from "@/app/utils/compoundBuilderQuery";
import { fetchSample } from "@/app/utils/fetch";

type OverviewProps = { id: string };

export type OverviewData = { 
    class?: { value: string }; 
    superclass?: { value: string }; 
    pathway?: { value: string } };

export default async function Overview({ id }: OverviewProps) {
  const query = buildMetabolicClassQuery(id);
  const data: OverviewData[] = await fetchSample(query);

  const overview = data[0] ?? {};

  return (
    <div className="m-5 mx-auto border rounded-md p-5">
      <h3 className="pb-3 text-2xl"> Overview </h3>
      <div className="flex gap-10">
          <div>
            <p className="mb-2 font-medium"> Class: </p>
            <p className="mb-2 font-medium"> Superclass: </p>
            <p className="mb-2 font-medium"> Pathway: </p>
          </div>
          <div>
            <p className="mb-2 ">{overview.class?.value ?? "-"}</p>
            <p className="mb-2">{overview.superclass?.value ?? "-"}</p>
            <p className="mb-2">{overview.pathway?.value ?? "-"}</p>
          </div>
      </div>
    </div>
  );
}
