import { useNavigate } from "react-router-dom";

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  const container = {
    maxWidth: "900px",
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
      <h2>Employee Dashboard</h2>
      <p>Read-only access to assigned store.</p>

      <div style={card} onClick={() => navigate("/stores")}>
        <b>View Store</b>
        <p>See store details</p>
      </div>
    </div>
  );
}
