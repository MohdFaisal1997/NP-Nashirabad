import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Users from "./pages/Users";
import Contractors from "./pages/Contractors";
import Employees from "./pages/Employees";
import Banks from "./pages/Banks";
import PaymentDeposit from "./pages/PaymentDeposit";
import PaymentPaid from "./pages/PaymentPaid";
import TransactionReport from "./pages/TransactionReport";
import ReportPage from "./pages/Reports";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contractors"
          element={
            <ProtectedRoute>
              <Contractors />
            </ProtectedRoute>
          }
        />
        <Route path="/employees" element={<Employees />} />
        <Route path="/banks" element={<Banks />} />
        <Route path="/payment-deposit" element={<PaymentDeposit />} />
        <Route path="/payment-paid" element={<PaymentPaid />} />
        <Route path="/payment-report" element={<TransactionReport />} />
        <Route path="/report" element={<ReportPage/>} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;