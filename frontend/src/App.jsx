import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Login from "./pages/Login";
import Stores from "./pages/Stores";
import NearestStore from "./pages/NearestStore";

import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import CreateStore from "./pages/CreateStore";
import EditStore from "./pages/EditStore";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { AuthProvider, AuthContext } from "./context/AuthContext";

/* 🔁 Redirect logged-in users to their role dashboard */
function DashboardRedirect() {
  const { user } = useContext(AuthContext);
  return <Navigate to={`/${user.role}`} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          {/* ================= PUBLIC ================= */}
          <Route path="/login" element={<Login />} />

          {/* ================= DASHBOARD REDIRECT ================= */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardRedirect />
              </ProtectedRoute>
            }
          />

          {/* ================= ROLE DASHBOARDS ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager"
            element={
              <ProtectedRoute role="manager">
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee"
            element={
              <ProtectedRoute role="employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================= STORE MANAGEMENT ================= */}
          <Route
            path="/stores"
            element={
              <ProtectedRoute>
                <Stores />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/create-store"
            element={
              <ProtectedRoute role="admin">
                <CreateStore />
              </ProtectedRoute>
            }
          />

          <Route
            path="/stores/:id/edit"
            element={
              <ProtectedRoute>
                <EditStore />
              </ProtectedRoute>
            }
          />

          {/* ================= LOCATION ================= */}
          <Route
            path="/nearest-store"
            element={
              <ProtectedRoute>
                <NearestStore />
              </ProtectedRoute>
            }
          />

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
