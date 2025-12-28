import { useState } from "react";
import api from "../api/api";

export default function NearestStore() {
  const [pincode, setPincode] = useState("");
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async () => {
    // ✅ Frontend validation
    if (!/^\d{6}$/.test(pincode)) {
      setError("Please enter a valid 6-digit pincode");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const res = await api.get(`/stores/nearest?pincode=${pincode}`);
      setStores(res.data.nearestStores);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch nearest stores");
    } finally {
      setLoading(false);
    }
  };

  const container = {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px"
  };

  const title = {
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "20px"
  };

  const searchBox = {
    display: "flex",
    gap: "10px",
    marginBottom: "10px"
  };

  const errorStyle = {
    color: "red",
    marginBottom: "20px"
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px"
  };

  const card = {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  };

  const distance = {
    marginTop: "10px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#2563eb"
  };

  return (
    <div style={container}>
      <h2 style={title}>Find Nearest Store</h2>

      <div style={searchBox}>
        <input
          placeholder="Enter 6-digit Pincode"
          value={pincode}
          maxLength={6}
          onChange={e => setPincode(e.target.value)}
        />
        <button className="primary" onClick={search} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <div style={errorStyle}>{error}</div>}

      <div style={grid}>
        {stores.map(store => (
          <div key={store.storeId} style={card}>
            <b>{store.storeName}</b>
            <div>{store.address}</div>
            <div style={distance}>{store.distance}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
