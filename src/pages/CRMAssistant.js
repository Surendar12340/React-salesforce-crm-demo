import React, { useState } from "react";
import "./CRMAssistant.css";

function CRMAssistant() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateInsight = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("sf_access_token");
      const instanceUrl = localStorage.getItem("sf_instance_url");

      const response = await fetch("http://localhost:5000/api/crm-assistant/summary", {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-instance-url": instanceUrl,
        },
      });

      const result = await response.json();
      console.log("CRM Assistant Response:", result);
      setData(result);
    } catch (error) {
      console.error("Agent Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const summary = data?.summary || {};

  return (
    <div className="agent-page">
      <div className="agent-header">
        <h2>CRM Assistant Agent 🤖</h2>
        <p>Generate smart Salesforce customer insights.</p>
      </div>

      <button className="agent-btn" onClick={generateInsight}>
        {loading ? "Generating..." : "Generate Customer Insight"}
      </button>

      {data && (
        <div className="agent-card">
          <h3>AI Summary</h3>

          <p>{summary.insight || "CRM Assistant generated Salesforce insight."}</p>

          <div className="agent-stats">
            <div>
              <h4>{summary.totalCustomers || 0}</h4>
              <span>Customers</span>
            </div>

            <div>
              <h4>{summary.totalInteractions || 0}</h4>
              <span>Interactions</span>
            </div>

            <div>
              <h4>{summary.totalActivities || 0}</h4>
              <span>Activities</span>
            </div>
          </div>

          <div className="recommendation">
            <strong>Recommendation:</strong>
            <p>{summary.recommendation || "No recommendation available."}</p>
          </div>
           <div className="health-score-card">
            <h4>Health Score</h4>
            <div className="score-circle">
  <p>{summary.healthScore }/100</p>
            </div>
          
          </div>
        </div>
      )}
    </div>
  );
}

export default CRMAssistant;