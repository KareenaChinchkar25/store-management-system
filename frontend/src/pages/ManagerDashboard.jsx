import { useNavigate } from "react-router-dom";

export default function ManagerDashboard() {
  const navigate = useNavigate();

  const container = {
    maxWidth: "1100px",
    margin: "40px auto",
    padding: "20px"
  };

  const card = {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    marginTop: "20px",
    cursor: "pointer"
  };

  return (
    <div style={container}>
      <h2>Manager Dashboard</h2>
      <p>You can manage assigned stores.</p>

      <div style={card} onClick={() => navigate("/stores")}>
        <b>My Stores</b>
        <p>View and update your stores</p>
      </div>

      <div style={card} onClick={() => navigate("/nearest-store")}>
        <b>Nearest Store</b>
        <p>Search nearby stores</p>
      </div>
    </div>
  );
}
