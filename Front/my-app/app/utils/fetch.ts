  export async function fetchSample(query: string) {
    const res = await fetch("http://localhost:4000/sparql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    });

    const data = await res.json();
    return data.results.bindings;
  }