import React, { useState } from "react";
import "./Profile.css";

function Profile() {
  const [customer, setCustomer] = useState({
    customerName: "",
    phone: "",
    customerCode: "",
    number: "",
    status: "",
    industry: "",
    website: "",
  });

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
  const accessToken =
  localStorage.getItem("sf_access_token") ||
  localStorage.getItem("access_token");

const instanceUrl = localStorage.getItem("sf_instance_url");
console.log("Token:", accessToken);
console.log("Instance URL:", instanceUrl);
    const response = await fetch(
     "http://localhost:5000/api/create-customer/create", {
      
        method: "POST",
       headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${accessToken}`,
  "x-instance-url": instanceUrl,
},
        body: JSON.stringify(customer),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Customer Created Successfully");

      setCustomer({
        customerName: "",
        phone: "",
        customerCode: "",
        number: "",
        status: "",
        industry: "",
        website: "",
      });
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Error creating customer");
  }
};

  return (
    <div className="profile-container">
      <div className="customer-card">
        <h2>New Customer</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="customerName"
            placeholder="Customer Name"
            value={customer.customerName}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={customer.phone}
            onChange={handleChange}
          />

          <input
            name="customerCode"
            placeholder="Customer Code"
            value={customer.customerCode}
            onChange={handleChange}
          />

          <input
            name="number"
            placeholder="Number"
            value={customer.number}
            onChange={handleChange}
          />

          <select name="status" value={customer.status} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <input
            name="industry"
            placeholder="Industry"
            value={customer.industry}
            onChange={handleChange}
          />

          <input
            name="website"
            placeholder="Website"
            value={customer.website}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;