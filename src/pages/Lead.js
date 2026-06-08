import React, { useEffect, useState } from "react";
import "./Lead.css";

const Lead = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

 const params = new URLSearchParams(
  window.location.hash.replace("#", "")
);

const accessToken = localStorage.getItem("sf_access_token");
const instanceUrl = localStorage.getItem("sf_instance_url");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
      const response = await fetch("http://localhost:5000/api/leads", {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "x-instance-url": instanceUrl,
  },
});

       const data = await response.json();

console.log("Lead API response:", data);

if (!Array.isArray(data)) {
  console.log("API error:", data);
  setLeads([]);
  return;
}

setLeads(data);
        setLeads(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Lead fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    console.log("TOKEN:", accessToken);
console.log("INSTANCE:", instanceUrl);
    fetchLeads();
  }, [accessToken]);

  return (
  <div className="lead-page">

    <div className="lead-header">
      <h2>Lead Management</h2>
      <p>View and manage Salesforce leads</p>
    </div>

    <div className="lead-table-card">

      <table className="lead-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Status</th>
            <th>Lead Source</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead.Id}>
              <td>{lead.Name}</td>
              <td>{lead.Company}</td>
              <td>{lead.Phone}</td>
              <td>{lead.Email}</td>

              <td>
                <span className="status-badge">
                  {lead.Status}
                </span>
              </td>

              <td>{lead.LeadSource}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  </div>
);
};

export default Lead;