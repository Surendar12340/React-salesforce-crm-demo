import React from "react";
import "./Home.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function Home() {
  const leadStatusData = [
    { name: "Open", value: 12 },
    { name: "Working", value: 18 },
    { name: "Converted", value: 9 },
    { name: "Closed", value: 6 },
  ];

  const industryData = [
    { industry: "Energy", customers: 10 },
    { industry: "Telecom", customers: 7 },
    { industry: "Retail", customers: 5 },
    { industry: "Banking", customers: 8 },
  ];

  const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="dashboard-page">
      <h1>CRM Dashboard</h1>

      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Customers</h3>
          <p>120</p>
        </div>

        <div className="summary-card">
          <h3>Total Leads</h3>
          <p>45</p>
        </div>

        <div className="summary-card">
          <h3>Total Interactions</h3>
          <p>89</p>
        </div>

        <div className="summary-card">
          <h3>Total Employees</h3>
          <p>22</p>
        </div>
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <h2>Lead Status</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leadStatusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {leadStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Customer Industry</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={industryData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="industry" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar dataKey="customers" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Home;