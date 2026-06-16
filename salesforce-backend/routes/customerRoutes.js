const express = require("express");
const router = express.Router();
const jsforce = require("jsforce");

router.get("/paged-test", (req, res) => {
  res.json({ message: "Paged route working" });
});

router.get("/paged", async (req, res) => {
  console.log("Paged customer API called");

  const start = Date.now();

  try {
    const accessToken = req.headers.authorization?.replace("Bearer ", "");
    const instanceUrl = req.headers["x-instance-url"];

    if (!accessToken || !instanceUrl) {
      return res.status(401).json({
        message: "Missing Salesforce token or instance URL",
      });
    }

    const conn = new jsforce.Connection({
      instanceUrl,
      accessToken,
    });

    const result = await conn.query(`
      SELECT Id, Name, CreatedDate
      FROM Customer__c
      ORDER BY CreatedDate DESC
      LIMIT 1
    `);

    res.json({
      records: result.records,
      count: result.records.length,
      timeTakenMs: Date.now() - start,
    });
  } catch (error) {
    console.error("Customer paged API Error:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";

    const token = req.headers.authorization;
    const instanceUrl = req.headers["x-instance-url"];

    if (!token || !instanceUrl) {
      return res.status(401).json({
        error: "Missing Salesforce token or instance URL",
      });
    }

    const soql = `
      SELECT Id, Name, Phone__c, Industry__c, Website__c, Status__c,
             Customer_Code__c, Number__c
      FROM Customer__c
      WHERE Name LIKE '%${search}%'
      LIMIT 10
    `;

    console.log("CUSTOMER SOQL:", soql);

    const response = await fetch(
      `${instanceUrl}/services/data/v59.0/query?q=${encodeURIComponent(soql)}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const data = await response.json();

    res.json(data.records || []);
  } catch (error) {
    console.error("Customer API Error:", error);
    res.status(500).json({
      error: "Failed to fetch customers",
    });
  }
});

module.exports = router;