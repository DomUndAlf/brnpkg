import Wrapper from "@/app/components/Detailpage/Wrapper";
import { buildCompoundDetailQuery } from "@/app/utils/compoundBuilderQuery";

async function fetchCompoundDetails(id: string) {
  const query = buildCompoundDetailQuery(id);

  const res = await fetch(
    "http://localhost:3030/nubbe2KG/query?query=" + encodeURIComponent(query),
    {
      headers: { Accept: "application/sparql-results+json" },
      cache: "no-store",
    }
  );

  const json = await res.json();
  return json.results.bindings[0] ?? null;
}

export default async function CompoundPage({ params }: { params: { id: string } }) {
  const data = await fetchCompoundDetails(params.id);

  return <Wrapper id={params.id} data={data} />;
}
