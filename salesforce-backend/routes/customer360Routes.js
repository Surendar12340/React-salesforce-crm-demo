const express = require("express");
const router = express.Router();
const jsforce = require("jsforce");

router.get("/:customerId", async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.replace("Bearer ", "");
    const instanceUrl = req.headers["x-instance-url"];
    const { customerId } = req.params;

    if (!accessToken || !instanceUrl) {
      return res.status(401).json({ message: "Missing Salesforce credentials" });
    }

    const conn = new jsforce.Connection({ instanceUrl, accessToken });

    const customer = await conn.sobject("Customer__c").retrieve(customerId);

   const interactions = await conn.query(`
  SELECT Id, Name, Interaction_Type__c, Status__c, Create_Notes__c, InteractionDate__c, CreatedDate
  FROM Interaction__c
  WHERE Customer__c = '${customerId}'
  ORDER BY CreatedDate DESC
  LIMIT 10
`);

    const activities = await conn.query(`
  SELECT Id, Name, Interaction__c, Interaction__r.Name, Activity_Notes__c, Account_Status__c, Account_DateTime__c, CreatedDate
  FROM Interaction_Activity__c
  ORDER BY CreatedDate DESC
  LIMIT 10
`);

    res.json({
      customer,
      interactions: interactions.records,
      activities: activities.records,
    });
  } catch (error) {
    console.error("Customer 360 Error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;