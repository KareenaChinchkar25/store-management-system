import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const container = {
    maxWidth: "1100px",
    margin: "40px auto",
    padding: "20px"
  };

  const title = {
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "10px"
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "30px"
  };

  const card = {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    cursor: "pointer"
  };

  return (
    <div style={container}>
      <h2 style={title}>Admin Dashboard</h2>
      <p>You have full system access.</p>

      <div style={grid}>
        <div style={card} onClick={() => navigate("/stores")}>
          <b>Manage Stores</b>
          <p>Create, update, delete stores</p>
        </div>

        <div style={card}>
          <b>Manage Users</b>
          <p>Assign managers and employees</p>
        </div>

        <div style={card} onClick={() => navigate("/nearest-store")}>
          <b>Nearest Store</b>
          <p>Search stores by pincode</p>
        </div>
      </div>
    </div>
  );
}
