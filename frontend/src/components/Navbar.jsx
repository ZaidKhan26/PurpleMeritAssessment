import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#eee" }}>
      <div>
        <strong>Dashboard</strong>
      </div>

      <div>
        {user && <span style={{ marginRight: "10px" }}>{user.email}</span>}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;