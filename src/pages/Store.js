import React, { useEffect, useState } from "react";

function Store() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchStores = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const accessToken = localStorage.getItem("sf_access_token");
      const instanceUrl = localStorage.getItem("sf_instance_url");

      const response = await fetch("http://localhost:5000/api/stores", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-instance-url": instanceUrl,
        },
      });

      const data = await response.json();
      console.log("STORE API RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch stores");
      }

      setStores(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Store error:", error);
      setErrorMessage(error.message);
      setStores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div>
      <h2>Store</h2>

      <button onClick={fetchStores}>
        {loading ? "Loading..." : "Refresh Stores"}
      </button>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {!loading && stores.length === 0 && !errorMessage && (
        <p>No store records found.</p>
      )}

      <div className="results">
        {stores.map((store) => (
         <div className="customer-card" key={store.Id}>
  <h3>{store.Name}</h3>

 <p>
  <strong>Store Number:</strong>{" "}
  {store.StoreNumber__c || "N/A"}
</p>

<p>
  <strong>Location:</strong>{" "}
  {store.Location__c || "N/A"}
</p>

<p>
  <strong>Store Type:</strong>{" "}
  {store.StoreType__c || "N/A"}
</p>
</div>
        ))}
      </div>
    </div>
  );
}

export default Store;