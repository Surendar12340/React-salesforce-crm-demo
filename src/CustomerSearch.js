import { useState } from "react";
import "./CustomerSearch.css";

import Employee from "./pages/Employee";
import Store from "./pages/Store";
import EmployeeStoreRelationship from "./pages/EmployeeStoreRelationship";

function CustomerSearch({ onView360 }) {
  const [activePage, setActivePage] = useState("customerSearch");
  const [searchText, setSearchText] = useState("");
  const [customers, setCustomers] = useState([]);

  const searchCustomers = async () => {
    const accessToken = localStorage.getItem("sf_access_token");
    const instanceUrl = localStorage.getItem("sf_instance_url");

    const response = await fetch(
      `http://localhost:5000/customers/search?q=${searchText}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-instance-url": instanceUrl,
        },
      }
    );

    const data = await response.json();
    console.log("Customer API DATA:", data);
    setCustomers(Array.isArray(data) ? data : []);
  };

  return (
    <div className="page">
      <div className="sidebar">
        <h2>CRM Demo</h2>

        <ul>
          <li
            className={activePage === "customerSearch" ? "active" : ""}
            onClick={() => setActivePage("customerSearch")}
          >
            Customer Search
          </li>

          <li onClick={() => setActivePage("home")}>Home</li>
          <li onClick={() => setActivePage("interaction")}>Interaction</li>
          <li onClick={() => setActivePage("lead")}>Lead</li>
          <li onClick={() => setActivePage("interactionActivity")}>
            Interaction Activity
          </li>
          <li onClick={() => setActivePage("customer")}>Customer</li>
          <li onClick={() => setActivePage("customerAccount")}>
            Customer Account
          </li>
          <li onClick={() => setActivePage("profileContact")}>
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
      </div>

      <div className="main-content">
        {activePage === "customerSearch" && (
          <>
            <div className="dashboard-cards">
              <div className="dash-card">
                <h3>Customers</h3>
                <p>{customers.length}</p>
              </div>

              <div className="dash-card">
                <h3>Industry</h3>
                <p>{customers[0]?.Industry__c || "N/A"}</p>
              </div>

              <div className="dash-card">
                <h3>Status</h3>
                <p>{customers[0]?.Status__c || "N/A"}</p>
              </div>
            </div>

            <div className="card">
              <h3>Salesforce Customer Search</h3>
              <p className="subtitle">
                Search custom Customer__c records from Salesforce
              </p>

              <div className="search-row">
                <input
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Enter customer name"
                />
                <button onClick={searchCustomers}>Search</button>
              </div>
            </div>
<div className="results">
  {customers.map((customer) => (
    <div className="customer-card" key={customer.Id}>
    
    
      <h2>{customer.Name} test123</h2>
     <p
  onClick={() => onView360(customer.Id)}
  style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }}
>
  Open Customer 360
</p>
      <p><strong>Phone:</strong> {customer.Phone__c}</p>
      <p><strong>Industry:</strong> {customer.Industry__c}</p>
      <p><strong>Status:</strong> {customer.Status__c}</p>
      <p><strong>Website:</strong> {customer.Website__c}</p>
      <p><strong>Customer Code:</strong> {customer.Customer_code__c}</p>
      <p><strong>Number:</strong> {customer.Number__c}</p>
      
      


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

        {activePage === "home" && <h2>Home Page Coming Soon</h2>}
        {activePage === "interaction" && <h2>Interaction Page Coming Soon</h2>}
        {activePage === "lead" && <h2>Lead Page Coming Soon</h2>}
        {activePage === "interactionActivity" && (
          <h2>Interaction Activity Page Coming Soon</h2>
        )}
        {/* {activePage === "customer" && <h2>Customer Page Coming Soon</h2>}
        {activePage === "customerAccount" && (
          <h2>Customer Account Page Coming Soon</h2>
        )}
        {activePage === "profileContact" && (
          <h2>Profile / Contact Page Coming Soon</h2>
        )} */}
      </div>
    </div>
  );
}

export default CustomerSearch;