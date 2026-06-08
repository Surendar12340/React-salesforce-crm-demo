import React, { useState } from "react";
import "./CustomerImport.css";

function CustomerImport() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select Excel file");
      return;
    }

    const accessToken =
      localStorage.getItem("sf_access_token") ||
      localStorage.getItem("access_token");

    const instanceUrl = localStorage.getItem("sf_instance_url");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:5000/api/customer-import/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-instance-url": instanceUrl,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage(`✅ ${data.inserted} customers imported successfully`);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

 return (
  <div className="import-page">
    <div className="import-card">
      <h2>📥 Bulk Customer Import</h2>
      <p>Upload Excel/CSV file and create Customer records in Salesforce.</p>

      <label className="file-box">
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <span>{file ? file.name : "Choose Excel / CSV File"}</span>
      </label>

      <button className="upload-btn" onClick={handleUpload}>
        Upload to Salesforce
      </button>

      {message && <div className="success-msg">{message}</div>}
    </div>
  </div>
);
}

export default CustomerImport;