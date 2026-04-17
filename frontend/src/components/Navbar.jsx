import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        User Management
      </h1>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-gray-600 text-sm">{user.email}</span>
        )}

        <button
          onClick={() => navigate("/dashboard")}
          className="hover:text-blue-600"
        >
          Dashboard
        </button>

        {(user?.role === "admin" || user?.role === "manager") && (
          <button
            onClick={() => navigate("/users")}
            className="hover:text-blue-600"
          >
            Users
          </button>
        )}

        <button
          onClick={() => navigate("/profile")}
          className="hover:text-blue-600"
        >
          Profile
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;