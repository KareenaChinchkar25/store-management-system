import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateStore() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    type: "",
    address: "",
    pincode: "",
    contact: "",
    hours: ""
  });

  const update = (key, value) =>
    setForm({ ...form, [key]: value });

  const submit = async () => {
    try {
      await api.post("/stores", form);
      alert("Store created successfully");
      navigate("/stores");
    } catch (err) {
      alert("Failed to create store");
    }
  };

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
        <h2>Create Store</h2>

        <input style={input} placeholder="Store Name"
          onChange={e => update("name", e.target.value)} />

        <input style={input} placeholder="Store Type (Grocery, Pharmacy)"
          onChange={e => update("type", e.target.value)} />

        <input style={input} placeholder="Address"
          onChange={e => update("address", e.target.value)} />

        <input style={input} placeholder="Pincode"
          onChange={e => update("pincode", e.target.value)} />

        <input style={input} placeholder="Contact Number"
          onChange={e => update("contact", e.target.value)} />

        <input style={input} placeholder="Operating Hours"
          onChange={e => update("hours", e.target.value)} />

        <button style={button} onClick={submit}>
          Create Store
        </button>
      </div>
    </div>
  );
}
