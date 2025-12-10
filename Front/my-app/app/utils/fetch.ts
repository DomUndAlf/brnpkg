  export async function fetchSample(query: string) {
    const res = await fetch("http://localhost:4000/sparql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    });

    const data = await res.json();

    console.log("query:", query);
    console.log("response:", res);

    return data.results.bindings;
  }