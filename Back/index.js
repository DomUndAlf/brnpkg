import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const FE_URL=process.env.FE_URL;

const FUSEKI_URL=process.env.FUSEKI_URL;
const BE_PORT=process.env.BE_PORT;

const app = express();
app.use(cors({
  origin: FE_URL
}));
app.use(express.json());

app.post("/sparql", async (req, res) => {
  try {
        const query = req.body?.query;

    if (!query) {
      return res.status(400).json({ error: "Missing query" });
    }
    const response = await fetch(FUSEKI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/sparql-query",
        "Accept": "application/sparql-results+json"
      },
      body: query
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(BE_PORT || 4000, () => console.log("Backend läuft auf Port " + BE_PORT));

// app.post(/converToMol2) noch implementieren
