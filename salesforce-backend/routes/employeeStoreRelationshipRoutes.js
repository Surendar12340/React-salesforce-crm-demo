const express = require("express");
const router = express.Router();
const jsforce = require("jsforce");

router.get("/", async (req, res) => {
  try {
   const accessToken = req.headers.authorization?.replace("Bearer ", "");

    console.log("ESR TOKEN:", accessToken ? "Token received" : "No token");

    const conn = new jsforce.Connection({
      instanceUrl: "https://resilient-wolf-ndaaf4-dev-ed.trailblaze.my.salesforce.com",
      accessToken
    });

    const result = await conn.query(`
      SELECT Id, Name,
             Employee__c,
             Employee__r.Name,
             Store__c,
             Store__r.Name,
             Role__c,
             Status__c
      FROM Employee_Store_Relationship__c
      ORDER BY CreatedDate DESC
    `);

    console.log("ESR TOTAL:", result.totalSize);
    console.log("ESR RECORDS:", JSON.stringify(result.records, null, 2));

    res.json(result.records);
  } catch (error) {
    console.error("ESR ERROR:", error);
    res.status(500).json({
      error: error.message,
      errorCode: error.errorCode
    });
  }
});

module.exports = router;