import React, { useEffect, useState } from "react";

function CustomerPerformance() {
  const [customers, setCustomers] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadCustomers = async () => {
    setLoading(true);

    const token = localStorage.getItem("sf_access_token");
    const instanceUrl = localStorage.getItem("sf_instance_url");

    const start = performance.now();

    const response = await fetch("http://localhost:5000/api/customers/paged", {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-instance-url": instanceUrl,
      },
    });

    const data = await response.json();

    setCustomers(data.records || []);
    setTimeTaken(Math.round(performance.now() - start));
    setLoading(false);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Customer Performance Demo</h2>

      <p>Total records loaded: {customers.length}</p>
      <p>Frontend load time: {timeTaken} ms</p>

      {loading && <p>Loading...</p>}

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Created Date</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.Id}>
              <td>{c.Name}</td>
              <td>{c.CreatedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerPerformance;