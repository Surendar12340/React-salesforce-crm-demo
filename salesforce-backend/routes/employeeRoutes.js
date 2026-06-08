const express = require("express");
const router = express.Router();
const jsforce = require("jsforce");

router.get("/", async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.replace("Bearer ", "");
    const instanceUrl = req.headers["x-instance-url"];

    if (!accessToken || !instanceUrl) {
      return res.status(401).json({
        message: "Missing Salesforce access token or instance url",
      });
    }

    const conn = new jsforce.Connection({
      instanceUrl,
      accessToken,
    });

    const result = await conn.query(`
  SELECT Id, Name, EmployeeId__c, Designation__c, Email__c, Phone__c, Store__r.Name, User__r.Name
  FROM Employee__c
  ORDER BY CreatedDate DESC
  LIMIT 50
`);

    res.json(result.records);
  } catch (error) {
    console.error("Employee API Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;