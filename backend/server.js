const express = require("express");
const cors = require("cors");

require("./config/db");

const authRoutes = require("./routes/authRoutes");
const contratorsRoutes = require("./routes/contractors");
const employeeRoutes = require("./routes/employees");
const bankRoutes = require("./routes/banks");
// const transactionsRoutes = require("./routes/transactions");
const paymentsRoutes = require("./routes/payments");
const paymentReportsRoutes = require("./routes/paymentReports");
const reportRoutes = require("./routes/report");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/users",require("./routes/usersRoutes"));
app.use("/api/contractors",contratorsRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/banks", bankRoutes);
// app.use("/api/transactions",transactionsRoutes);
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/payments", paymentsRoutes);
app.use("/api/payment-reports", paymentReportsRoutes);
app.use("/api/report", reportRoutes);


app.listen(5000,()=>{
  console.log("Server running on port 5000");
});