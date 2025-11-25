import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/sparql", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3030/nubbe2KG/sparql", {
      method: "POST",
      headers: {
        "Content-Type": "application/sparql-query",
        "Accept": "application/sparql-results+json"
      },
      body: req.body.query
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4000, () => console.log("Backend läuft auf Port 4000"));
