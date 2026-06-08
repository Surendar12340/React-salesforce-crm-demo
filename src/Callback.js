import React, { useEffect, useState } from "react";
import Employee from "./pages/Employee";
import Store from "./pages/Store";
import EmployeeStoreRelationship from "./pages/EmployeeStoreRelationship";
import Lead from "./pages/Lead";
import Interaction from "./pages/Interaction";
import InteractionActivity from "./pages/InteractionActivity";
import Profile from "./pages/Profile";
import "./CustomerSearch.css";
import CustomerAccount from "./pages/CustomerAccount";
import Home from "./pages/Home";




function Callback() {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState("customerSearch");
  
  const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/login";
};
  useEffect(() => {
  const hash = window.location.hash;

  const accessToken = new URLSearchParams(hash.substring(1)).get("access_token");

  const instanceUrl = new URLSearchParams(hash.substring(1)).get("instance_url");

  if (accessToken && instanceUrl) {
    localStorage.setItem("sf_access_token", accessToken);
    localStorage.setItem("sf_instance_url", instanceUrl);

    window.location.hash = "";
  }

  }, []);

  const searchAccounts = () => {
    const accessToken = localStorage.getItem("sf_access_token");
    const instanceUrl = localStorage.getItem("sf_instance_url");

    setLoading(true);

    fetch(`http://localhost:5000/api/customers?search=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "x-instance-url": instanceUrl,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);

        if (data.records) {
          setAccounts(data.records);
        } else if (Array.isArray(data)) {
          setAccounts(data);
        } else {
          setAccounts([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Search error:", err);
        setAccounts([]);
        setLoading(false);
      });
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>CRM Demo</h2>

        <ul>
          <li
            className={activePage === "customerSearch" ? "active" : ""}
            onClick={() => setActivePage("customerSearch")}
          >
            Customer Search
          </li>

          <li
            className={activePage === "home" ? "active" : ""}
            onClick={() => setActivePage("home")}
          >
            Home
          </li>

          <li
            className={activePage === "interaction" ? "active" : ""}
            onClick={() => setActivePage("interaction")}
          >
            Interaction
          </li>

          <li
            className={activePage === "lead" ? "active" : ""}
            onClick={() => setActivePage("lead")}
          >
            Lead
          </li>

          <li
            className={activePage === "interactionActivity" ? "active" : ""}
            onClick={() => setActivePage("interactionActivity")}
          >
            Interaction Activity
          </li>

          {/* <li
            className={activePage === "customer" ? "active" : ""}
            onClick={() => setActivePage("customer")}
          >
            Customer
          </li>

          <li
            className={activePage === "customerAccount" ? "active" : ""}
            onClick={() => setActivePage("customerAccount")}
          >
            Customer Account
          </li> */}

          <li
            className={activePage === "profileContact" ? "active" : ""}
            onClick={() => setActivePage("profileContact")}
          >
            Profile / Contact
          </li>

          <li
            className={activePage === "employee" ? "active" : ""}
            onClick={() => setActivePage("employee")}
          >
            Employee
          </li>

          <li
            className={activePage === "store" ? "active" : ""}
            onClick={() => setActivePage("store")}
          >
            Store
          </li>

          <li
            className={
              activePage === "employeeStoreRelationship" ? "active" : ""
            }
            onClick={() => setActivePage("employeeStoreRelationship")}
          >
            Employee Store Relationship
          </li>
        
        </ul>
         <button className="sidebar-logout" onClick={handleLogout}>
    Logout
  </button>
      </div>
       

      {/* Main */}
      <div className="main-content">
        {activePage === "customerSearch" && (
          <>
            <div className="dashboard-cards">
              <div className="dash-card">
                <h3>Customers</h3>
                <p>{accounts.length}</p>
              </div>

              <div className="dash-card">
                <h3>Industry</h3>
              <p>
  {accounts.length > 0
    ? accounts[0].Industry__c || "N/A"
    : "N/A"}
</p>
              </div>

              <div className="dash-card">
                <h3>Status</h3>
                <p>
  {accounts.length > 0
    ? accounts[0].Status__c || "N/A"
    : "N/A"}
</p>
              </div>
            </div>

            <div className="search-card">
              <h4>Search Customer</h4>

              <div className="search-row">
                <input
                  type="text"
                  placeholder="Enter customer name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <button onClick={searchAccounts}>
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>

           <div className="results">
  {accounts.map((account) => (
    <div className="customer-card" key={account.Id}>
      <h3>{account.Name}</h3>

      <p>
        <strong>Phone:</strong> {account.Phone__c || "No Phone"}
      </p>

      <p>
        <strong>Industry:</strong> {account.Industry__c || "No Industry"}
      </p>

      <p>
        <strong>Status:</strong> {account.Status__c || "No Status"}
      </p>

      <p>
        <strong>Website:</strong> {account.Website__c || "No Website"}
      </p>

      <p>
        <strong>Customer Code:</strong> {account.Customer_code__c || "N/A"}
      </p>

      <p>
        <strong>Number:</strong> {account.Number__c || "N/A"}
      </p>
    </div>
  ))}
</div>
          </>
        )}

        {activePage === "employee" && <Employee />}
        {activePage === "store" && <Store />}

        {activePage === "employeeStoreRelationship" && (
          <EmployeeStoreRelationship />
        )}

        {activePage === "home" && <Home />}
      {activePage === "interaction" && 
  <Interaction />
}
        {activePage === "lead" && <Lead />}

        {activePage === "interactionActivity" && <InteractionActivity />
      }

       {/* {activePage === "customer" && <Customer />} */}

      {activePage === "customerAccount" && <CustomerAccount />}

        {activePage === "profileContact" && (
          <Profile />
        )}
      </div>
    </div>
  );
}

export default Callback;