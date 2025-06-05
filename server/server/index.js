const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/cities", async (req, res) => {
  const { q } = req.query;
  console.log("Received query:", q);

  try {
    const response = await axios.get("https://data.gov.il/api/3/action/datastore_search", {
      params: {
        resource_id: "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba",
        q,
        limit: 4000,
      },
    });

    const records = response.data.result.records;
    console.log("Records received:", records.length);

    const cityNamesSet = new Set(
      records
        .map(record => record["שם_ישוב"]?.trim())
        .filter(Boolean)
    );

    const uniqueCities = Array.from(cityNamesSet).map((name, index) => ({
      id: index + 1,
      name,
    }));

    console.log("Unique cities:", uniqueCities.length);
    res.json(uniqueCities);
  } catch (err) {
    console.error("Error fetching cities:", err.message);
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

router.get("/streets", async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "Missing city parameter" });

  try {
    const response = await axios.get("https://data.gov.il/api/3/action/datastore_search", {
      params: {
        resource_id: "a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3",
        q: city,
        limit: 4000,
      },
    });

    const records = response.data.result.records;
    const uniqueStreets = [...new Set(
      records.map(r => r["שם_רחוב"]?.trim()).filter(Boolean)
    )];

    res.json(uniqueStreets);
  } catch (err) {
    console.error("Error fetching streets:", err.message);
    res.status(500).json({ error: "Failed to fetch streets" });
  }
});

module.exports = router;
