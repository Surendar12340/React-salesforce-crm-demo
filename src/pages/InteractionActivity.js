import React, { useEffect, useState } from "react";
import "./InteractionActivity.css";

function InteractionActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";

    return new Date(dateValue).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchActivities = async () => {
    setLoading(true);

    try {
     const token = localStorage.getItem("sf_access_token");
const instanceUrl = localStorage.getItem("sf_instance_url");

const response = await fetch("http://localhost:5000/api/interaction-activities", {
  headers: {
    Authorization: `Bearer ${token}`,
    "x-instance-url": instanceUrl,
  },
});

      const data = await response.json();
      setActivities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="activity-page">
      <div className="activity-header">
        <h2>Interaction Activities</h2>
        <p>Track calls, follow-ups, notes, and customer activity history</p>
      </div>

      {loading && <p className="loading-text">Loading activities...</p>}

      {!loading && activities.length === 0 && (
        <div className="empty-card">No interaction activities found.</div>
      )}

      {!loading && activities.length > 0 && (
        <div className="activity-table-card">
          <table className="activity-table">
            <thead>
              <tr>
                <th>Activity Name</th>
                <th>Interaction</th>
                <th>Activity Type</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Date Time</th>
              </tr>
            </thead>

            <tbody>
              {activities.map((activity) => (
                <tr key={activity.Id}>
                  <td>
                    <strong>{activity.Name || "-"}</strong>
                  </td>
                  <td>{activity.Interaction__r?.Name || "-"}</td>
                  <td>{activity.Ac__c || "-"}</td>
                  <td>
                    <span className="activity-status">
                      {activity.Account_Status__c || "N/A"}
                    </span>
                  </td>
                  <td>{activity.Activity_Notes__c || "-"}</td>
                  <td>{formatDate(activity.Account_DateTime__c)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InteractionActivity;