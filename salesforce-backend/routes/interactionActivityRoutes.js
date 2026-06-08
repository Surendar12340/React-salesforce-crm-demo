const express = require("express");
const jsforce = require("jsforce");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.replace("Bearer ", "");

    if (!accessToken) {
      return res.status(401).json({
        error: "Access token missing",
      });
    }

    const conn = new jsforce.Connection({
      instanceUrl: process.env.SF_LOGIN_URL,
      accessToken,
    });

  const result = await conn.query(`
  SELECT Id,
         Name,
         Interaction__c,
         Interaction__r.Name,
         Ac__c,
         Account_Status__c,
         Activity_Notes__c,
         Account_DateTime__c,
         CreatedDate
  FROM Interaction_Activity__c
  ORDER BY CreatedDate DESC
`);

    res.json(result.records);
  } catch (error) {
    console.error("Interaction Activity Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;