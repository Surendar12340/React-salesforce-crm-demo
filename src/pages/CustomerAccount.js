import React, { useEffect, useState } from "react";

const CustomerAccount = () => {
  const [accounts, setAccounts] = useState([]);

  const params = new URLSearchParams(window.location.hash.replace("#", ""));
  const accessToken = params.get("access_token");

  useEffect(() => {
    fetchCustomerAccounts();
  }, []);

  const fetchCustomerAccounts = async () => {
    const response = await fetch("http://localhost:5000/api/customer-accounts", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    setAccounts(Array.isArray(data) ? data : []);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Customer Account Management</h1>

      {accounts.length === 0 ? (
        <p>No customer accounts found</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Salesforce Id</th>
            </tr>
          </thead>

          <tbody>
            {accounts.map((acc) => (
              <tr key={acc.Id}>
                <td>{acc.Name}</td>
                <td>{acc.Id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerAccount;