import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const FE_URL=process.env.FE_URL;

const FUSEKI_URL=process.env.FUSEKI_URL;
const BE_PORT=process.env.BE_PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sparql", async (req, res) => {
  try {
    const response = await fetch(FUSEKI_URL, {
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

app.listen(BE_PORT, () => console.log("Backend läuft auf Port " + BE_PORT));

// app.post(/converToMol2) noch implementieren
