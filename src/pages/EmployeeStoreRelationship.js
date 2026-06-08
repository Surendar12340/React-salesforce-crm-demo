import React, { useEffect, useState } from "react";

function EmployeeStoreRelationship() {
  const [relationships, setRelationships] = useState([]);

useEffect(() => {
  const fetchRelationships = async () => {
    try {
    const token = localStorage.getItem("sf_access_token");
const instanceUrl = localStorage.getItem("sf_instance_url");

const response = await fetch(
  "http://localhost:5000/api/employee-store-relationships",
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-instance-url": instanceUrl,
      "Content-Type": "application/json",
    },
  }
);
      const data = await response.json();

      console.log("ESR API RESPONSE:", data);

      if (Array.isArray(data)) {
        setRelationships(data);
      } else {
        setRelationships([]);
      }

    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  fetchRelationships();
}, []);

  return (
    <div className="page-container">
      <h2>Employee Store Relationships</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px"
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#1976d2", color: "white" }}>
            <th style={styles.th}>Relationship ID</th>
            <th style={styles.th}>Employee</th>
            <th style={styles.th}>Store</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>

        <tbody>
          {relationships.length > 0 ? (
            relationships.map((item) => (
              <tr key={item.Id}>
              <td style={styles.td}>{item.Name}</td>
<td style={styles.td}>{item.Employee__r?.Name || item.Employee__c}</td>
<td style={styles.td}>{item.Store__r?.Name || item.Store__c}</td>
<td style={styles.td}>{item.Role__c}</td>
<td style={styles.td}>{item.Status__c}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={styles.td}>
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  th: {
    padding: "12px",
    border: "1px solid #ddd"
  },

  td: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center"
  }
};

export default EmployeeStoreRelationship;