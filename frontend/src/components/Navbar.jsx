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
    <div className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1
          className="text-xl font-bold cursor-pointer tracking-wide"
          onClick={() => navigate("/dashboard")}
        >
          User Management
        </h1>

        <div className="flex items-center gap-4">
          {user && (
            <span className="hidden md:inline text-sm text-slate-300">
              {user.email}
            </span>
          )}

          <button
            onClick={() => navigate("/dashboard")}
            className="hover:text-blue-400 transition"
          >
            Dashboard
          </button>

          {(user?.role === "admin" || user?.role === "manager") && (
            <button
              onClick={() => navigate("/users")}
              className="hover:text-blue-400 transition"
            >
              Users
            </button>
          )}

          <button
            onClick={() => navigate("/profile")}
            className="hover:text-blue-400 transition"
          >
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1.5 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;