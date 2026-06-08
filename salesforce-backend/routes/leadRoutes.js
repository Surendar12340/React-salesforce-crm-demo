const express = require("express");
const jsforce = require("jsforce");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.replace("Bearer ", "");
    const instanceUrl = req.headers["x-instance-url"];

    if (!accessToken || !instanceUrl) {
      return res.status(401).json({
        error: "Access token or instance url missing",
      });
    }

    const conn = new jsforce.Connection({
      instanceUrl,
      accessToken,
    });

    const result = await conn.query(`
      SELECT Id, Name, Company, Phone, Email, Status, LeadSource
      FROM Lead
      ORDER BY CreatedDate DESC
      LIMIT 10
    `);

    res.json(result.records);
  } catch (error) {
    console.error("Lead Error:", error);
    res.status(500).json({
      error: error.message,
      errorCode: error.errorCode,
    });
  }
});

module.exports = router;