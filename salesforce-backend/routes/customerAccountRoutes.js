const express = require("express");
const jsforce = require("jsforce");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.replace("Bearer ", "");

    if (!accessToken) {
      return res.status(401).json({ error: "Access token missing" });
    }

    const conn = new jsforce.Connection({
      instanceUrl: process.env.SF_LOGIN_URL,
      accessToken
    });

    const result = await conn.query(`
      SELECT Id, Name
      FROM Customer_Account__c
      ORDER BY CreatedDate DESC
      LIMIT 20
    `);

    res.json(result.records);
  } catch (error) {
    console.error("Customer Account Error:", error);
    res.status(500).json({
      error: error.message,
      errorCode: error.errorCode
    });
  }
});

module.exports = router;