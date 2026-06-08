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
             Lead__c,
             Lead__r.Name,
             Customer__c,
             Customer__r.Name,
             Interaction_Type__c,
             Status__c,
             Create_Notes__c,
             InteractionDate__c,
             CreatedDate
      FROM Interaction__c
      ORDER BY CreatedDate DESC
    `);

    res.json(result.records);
  } catch (error) {
    console.error("Interaction Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;