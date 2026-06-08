const express = require("express");
const router = express.Router();
const jsforce = require("jsforce");

router.post("/create", async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.replace("Bearer ", "");
    const instanceUrl = req.headers["x-instance-url"];

    if (!accessToken || !instanceUrl) {
      return res.status(401).json({
        message: "Missing Salesforce access token or instance url",
      });
    }

    const conn = new jsforce.Connection({
      instanceUrl: instanceUrl,
      accessToken: accessToken,
    });

    const result = await conn.sobject("Customer__c").create({
      Name: req.body.customerName,
      Phone__c: req.body.phone,
      Customer_Code__c: req.body.customerCode,
      Number__c: req.body.number,
      Status__c: req.body.status,
      Industry__c: req.body.industry,
      Website__c: req.body.website,
    });

    res.json({
      success: true,
      id: result.id,
      message: "Customer Created Successfully",
    });
  } catch (error) {
    console.error("Create Customer Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
});

module.exports = router;