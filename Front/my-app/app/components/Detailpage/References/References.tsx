import RefItems, { ReferenceData } from "./RefList";
import { fetchSample } from "@/app/utils/fetch";
import { buildReferencesQuery } from "@/app/utils/compoundBuilderQuery";

type RefProps = {
    id: string;
};

export default async function References({ id }: RefProps) {
    const query = buildReferencesQuery(id);
    const data: ReferenceData[] = await fetchSample(query);

    return (
        <div className="mx-auto border rounded-md p-5">
            <h3 className="text-2xl mb-5">References</h3>
            <div className="grid grid-cols-5 gap-15 pl-4 ">
                <span className="font-medium pb-4 text-green-700"> DOI </span>
                <span className="font-medium pb-4 text-green-700"> Bioacitvity</span>
                <span className="font-medium pb-4 text-green-700"> Species</span>
                <span className="font-medium pb-4 text-green-700"> State </span>
                <span className="font-medium pb-4 text-green-700"> City </span>
            </div>
            {data.length === 0 && <p>no data</p>}

            {data.map((ref: ReferenceData, idx: number) => (
                <RefItems key={idx} refData={ref} />
            ))}
        </div>
    );
}
