import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();

  // Hide navbar on login page or if not logged in
  if (!user || location.pathname === "/login") return null;

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={navStyle}>
      <div style={left}>
        <Link
          to={`/${user.role}`}
          style={isActive(`/${user.role}`) ? activeLink : link}
        >
          Dashboard
        </Link>

        <Link
          to="/stores"
          style={isActive("/stores") ? activeLink : link}
        >
          Stores
        </Link>

        <Link
          to="/nearest-store"
          style={isActive("/nearest-store") ? activeLink : link}
        >
          Nearest Store
        </Link>
      </div>

      <button style={logoutBtn} onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

/* ===== STYLES ===== */

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 40px",
  background: "#111827",
  color: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
};

const left = {
  display: "flex",
  gap: "24px"
};

const link = {
  color: "#d1d5db",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "500"
};

const activeLink = {
  ...link,
  color: "#ffffff",
  borderBottom: "2px solid #2563eb",
  paddingBottom: "4px"
};

const logoutBtn = {
  padding: "8px 14px",
  backgroundColor: "#dc2626",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600"
};
