const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";

    const token = req.headers.authorization;
    const instanceUrl = req.headers["x-instance-url"];
const soql = `
  SELECT Id,
         Name,
         Phone__c,
         Industry__c,
         Website__c,
         Status__c,
         Customer_code__c,
         Number__c
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