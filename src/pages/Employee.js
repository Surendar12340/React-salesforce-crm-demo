import React, { useEffect, useState } from "react";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const accessToken = localStorage.getItem("sf_access_token");
const instanceUrl = localStorage.getItem("sf_instance_url");

console.log("accessToken:", accessToken);
console.log("instanceUrl:", instanceUrl);

      const response = await fetch("http://localhost:5000/api/employees", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-instance-url": instanceUrl,
        },
      });

      const data = await response.json();
      console.log("Employee API response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch employees");
      }

      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Employee frontend error:", error);
      setErrorMessage(error.message);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employee</h2>

      <button onClick={fetchEmployees}>
        {loading ? "Loading..." : "Refresh Employees"}
      </button>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {!loading && employees.length === 0 && !errorMessage && (
        <p>No employee records found.</p>
      )}

      <div className="results">
        {employees.map((emp) => (
          <div className="customer-card" key={emp.Id}>
           {employees.map((emp) => (
  <div
    key={emp.Id}
    style={{
      background: "#ffffff",
      padding: "20px",
      marginBottom: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}
  >
    <h2 style={{ color: "#1e3a8a" }}>
      {emp.Name}
    </h2>

   <p><strong>Employee ID:</strong> {emp.EmployeeId__c || "Not Available"}</p>
<p><strong>Designation:</strong> {emp.Designation__c || "Not Available"}</p>
<p><strong>Email:</strong> {emp.Email__c || "Not Available"}</p>
<p><strong>Phone:</strong> {emp.Phone__c || "Not Available"}</p>
<p><strong>Store:</strong> {emp.Store__r?.Name || "Not Assigned"}</p>
<p><strong>User:</strong> {emp.User__r?.Name || "Not Assigned"}</p>

  </div>
))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Employee;