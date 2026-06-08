const express = require("express");
const router = express.Router();
const multer = require("multer");
const XLSX = require("xlsx");
const jsforce = require("jsforce");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.replace("Bearer ", "");
    const instanceUrl = req.headers["x-instance-url"];

    if (!accessToken || !instanceUrl) {
      return res.status(401).json({
        message: "Missing Salesforce credentials",
      });
    }

    const conn = new jsforce.Connection({
      accessToken,
      instanceUrl,
    });

    const workbook = XLSX.readFile(req.file.path);

    const sheetName = workbook.SheetNames[0];

    const customers = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );

    const records = customers.map((row) => ({
      Name: row.Name,
      Email__c: row.Email,
      Phone__c: row.Phone,
      Status__c: row.Status,
    }));

    const result = await conn
      .sobject("Customer__c")
      .create(records);

    res.json({
      success: true,
      inserted: result.length,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;