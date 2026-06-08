const express = require("express");
const cors = require("cors");
require("dotenv").config();

const customerRoutes = require("./routes/customerRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const storeRoutes = require("./routes/storeRoutes");
const employeeStoreRelationshipRoutes = require("./routes/employeeStoreRelationshipRoutes");
const leadRoutes = require("./routes/leadRoutes");
const customerAccountRoutes = require("./routes/customerAccountRoutes");
const interactionRoutes = require("./routes/interactionRoutes");
const interactionActivityRoutes = require("./routes/interactionActivityRoutes");
const createCustomerRoutes = require("./routes/createCustomerRoutes");
const customerImportRouter = require("./routes/customerImportRouter");



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/customers", customerRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/employee-store-relationships", employeeStoreRelationshipRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/customer-accounts", customerAccountRoutes);
app.use("/api/interactions", interactionRoutes);
app.use("/api/interaction-activities", interactionActivityRoutes);
app.use("/api/create-customer", createCustomerRoutes);
app.use("/api/customer-import", customerImportRouter);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});