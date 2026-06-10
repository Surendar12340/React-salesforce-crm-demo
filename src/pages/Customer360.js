import React, { useEffect, useState } from "react";

function Customer360({ customerId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!customerId) return;

    const accessToken = localStorage.getItem("sf_access_token");
    const instanceUrl = localStorage.getItem("sf_instance_url");

    fetch(`http://localhost:5000/api/customer360/${customerId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "x-instance-url": instanceUrl,
      },
    })
      .then((res) => res.json())
      .then(result => {
        console.log("Customer 360 API DATA:", result);
        setData(result);
      })
      .catch(console.error);
  }, [customerId]);

  if (!customerId) return <h3>Select a customer to view 360 details</h3>;
  if (!data || !data.customer) {return <h3>Loading Customer 360...</h3>;}

  return (
    <div style={{ padding: "30px" }}>
      <h2>Customer 360 View</h2>

      <div style={{ background: "white", padding: "20px", borderRadius: "12px" }}>
        <h3>{data.customer.Name}</h3>
        <p><b>Email:</b> {data.customer.Email__c}</p>
        <p><b>Phone:</b> {data.customer.Phone__c}</p>
        <p><b>Status:</b> {data.customer.Status__c}</p>
      </div>

      <h3>Interactions</h3>
      {data.interactions?.map((item) => (
        <div key={item.Id} style={{ background: "#f8fafc", margin: "10px", padding: "15px" }}>
          <b>{item.Name}</b>
          <p>{item.Type__c} - {item.Status__c}</p>
        </div>
      ))}

      <h3>Activities</h3>
      {data.activities.map((item) => (
        <div key={item.Id} style={{ background: "#f0fdf4", margin: "10px", padding: "15px" }}>
          <b>{item.Name}</b>
          <p>{item.Activity_Type__c} - {item.Status__c}</p>
        </div>
      ))}
    </div>
  );
}

export default Customer360;