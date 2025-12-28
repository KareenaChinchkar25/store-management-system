import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function EditStore() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [store, setStore] = useState(null);

  useEffect(() => {
    api.get(`/stores/${id}`).then(res => setStore(res.data));
  }, [id]);

  const save = async () => {
    try {
      await api.put(`/stores/${id}`, store);
      alert("Store updated");
      navigate("/stores");
    } catch {
      alert("Update failed");
    }
  };

  if (!store) return null;

  /* ===== STYLES ===== */

  const container = {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px"
  };

  const card = {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  };

  const input = {
    width: "100%",
    padding: "10px",
    marginBottom: "14px",
    borderRadius: "6px",
    border: "1px solid #d1d5db"
  };

  const button = {
    padding: "10px",
    width: "100%",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600"
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Edit Store</h2>

        {/* Admin can edit everything */}
        {user.role === "admin" && (
          <>
            <input style={input}
              value={store.name}
              onChange={e => setStore({ ...store, name: e.target.value })} />

            <input style={input}
              value={store.type}
              onChange={e => setStore({ ...store, type: e.target.value })} />
          </>
        )}

        {/* Manager can edit limited fields */}
        <input style={input}
          value={store.hours}
          onChange={e => setStore({ ...store, hours: e.target.value })} />

        <input style={input}
          value={store.contact}
          onChange={e => setStore({ ...store, contact: e.target.value })} />

        <button style={button} onClick={save}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
