const express = require("express");
const router = express.Router();
const jsforce = require("jsforce");

router.get("/summary", async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.replace("Bearer ", "");
    const instanceUrl = req.headers["x-instance-url"];

    if (!accessToken || !instanceUrl) {
      return res.status(401).json({ message: "Missing Salesforce auth" });
    }

    const conn = new jsforce.Connection({ instanceUrl, accessToken });
const customers = await conn.query(`
  SELECT Id, Name
  FROM Customer__c
  ORDER BY CreatedDate DESC
  LIMIT 50
`);

const interactions = await conn.query(`
  SELECT Id, Name
  FROM Interaction__c
  ORDER BY CreatedDate DESC
  LIMIT 20
`);

const activities = await conn.query(`
  SELECT Id, Name
  FROM Interaction_Activity__c
  ORDER BY CreatedDate DESC
  LIMIT 20
`);

const healthScore = Math.min( 100 ,
        customers.records.length * 2 +
    interactions.records.length * 10 +
    activities.records.length * 15);
    const summary = {
      totalCustomers: customers.records.length,
      totalInteractions: interactions.records.length,
      totalActivities: activities.records.length,
      healthScore: healthScore,
      recommendation:
        activities.records.length > 0
          ? "Follow up with customers who have pending activities."
          : "All customers acivities are up to date. Consider reaching out to recent customers for feedback.",
      insight:
        "CRM Assistant reviewed customers, interactions, and activities from Salesforce."
    };

    res.json({
      summary,
      customers: customers.records,
      interactions: interactions.records,
      activities: activities.records
    });
  } catch (error) {
    console.error("CRM Assistant Error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;