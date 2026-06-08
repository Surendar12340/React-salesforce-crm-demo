import React, { useEffect, useState } from "react";
import "./Interaction.css";

function Interaction() {
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";

    return new Date(dateValue).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchInteractions = async () => {
    setLoading(true);

    try {
     const token = localStorage.getItem("sf_access_token");
const instanceUrl = localStorage.getItem("sf_instance_url");

const response = await fetch("http://localhost:5000/api/interactions", {
  headers: {
    Authorization: `Bearer ${token}`,
    "x-instance-url": instanceUrl,
  },
});

      const data = await response.json();
      setInteractions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching interactions:", error);
      setInteractions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInteractions();
  }, []);

  return (
    <div className="interaction-page">
      <div className="interaction-header">
        <div>
          <h2>Interactions</h2>
          <p>Manage customer and lead interaction records</p>
        </div>
      </div>

      {loading && <p className="loading-text">Loading interactions...</p>}

      {!loading && interactions.length === 0 && (
        <div className="empty-card">No interactions found.</div>
      )}

      {!loading && interactions.length > 0 && (
        <div className="table-card">
          <table className="interaction-table">
            <thead>
              <tr>
                <th>Interaction</th>
                <th>Lead</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {interactions.map((item) => (
                <tr key={item.Id}>
                  <td>
                    <strong>{item.Name || "-"}</strong>
                  </td>
                  <td>{item.Lead__r?.Name || "-"}</td>
                  <td>{item.Customer__r?.Name || "-"}</td>
                  <td>{item.Interaction_Type__c || "-"}</td>
                  <td>
                    <span className="status-badge">
                      {item.Status__c || "N/A"}
                    </span>
                  </td>
                  <td>{item.Create_Notes__c || "-"}</td>
                  <td>{formatDate(item.InteractionDate__c)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Interaction;