import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Stores() {
  const [stores, setStores] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/stores").then(res => setStores(res.data));
  }, []);

  const deleteStore = async (id) => {
    if (!window.confirm("Are you sure you want to delete this store?")) return;
    await api.delete(`/stores/${id}`);
    setStores(stores.filter(s => s.id !== id));
  };

  /* ===== STYLES ===== */

  const container = {
    maxWidth: "1100px",
    margin: "40px auto",
    padding: "20px"
  };

  const title = {
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#1f2937"
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px"
  };

  const card = {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  };

  const storeName = {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "6px"
  };

  const storeType = {
    fontSize: "12px",
    color: "#1e3a8a",
    backgroundColor: "#e0e7ff",
    padding: "4px 8px",
    borderRadius: "4px",
    display: "inline-block",
    marginTop: "8px"
  };

  const actions = {
    marginTop: "14px",
    display: "flex",
    gap: "10px"
  };

  const btn = {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "13px"
  };

  const editBtn = {
    ...btn,
    backgroundColor: "#2563eb",
    color: "#fff"
  };

  const deleteBtn = {
    ...btn,
    backgroundColor: "#dc2626",
    color: "#fff"
  };

  /* ===== RENDER ===== */

  return (
    <div style={container}>
      <h2 style={title}>Stores</h2>

      {/* Admin Create Button */}
      {user?.role === "admin" && (
        <button
          style={{ ...editBtn, marginBottom: "20px" }}
          onClick={() => navigate("/admin/create-store")}
        >
          + Create Store
        </button>
      )}

      <div style={grid}>
        {stores.map(store => (
          <div key={store.id} style={card}>
            <div style={storeName}>{store.name}</div>
            <div>{store.address}</div>
            <div style={storeType}>{store.type}</div>

            {/* ROLE BASED ACTIONS */}
            <div style={actions}>
              {/* Admin */}
              {user?.role === "admin" && (
                <>
                  <button
                    style={editBtn}
                    onClick={() => navigate(`/stores/${store.id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    style={deleteBtn}
                    onClick={() => deleteStore(store.id)}
                  >
                    Delete
                  </button>
                </>
              )}

              {/* Manager */}
              {user?.role === "manager" && (
                <button
                  style={editBtn}
                  onClick={() => navigate(`/stores/${store.id}/edit`)}
                >
                  Update
                </button>
              )}

              {/* Employee → read-only */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
