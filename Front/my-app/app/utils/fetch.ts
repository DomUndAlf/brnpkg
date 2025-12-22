  export async function fetchSample(query: string) {
    const res = await fetch("http://localhost:4000/sparql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    });

    const data = await res.json();

    console.log("response:", res);

    return data.results.bindings;
  }

  export async function fetchSingle<T>(query: string): Promise<T | null> {
  const res = await fetchSample(query);

  if (!Array.isArray(res) || res.length === 0) {
    return null;
  }

  return res[0] as T;
}
