import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-blue-100 text-blue-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-xl font-bold text-slate-800"
            >
              User Management
            </button>

            <nav className="hidden md:flex items-center gap-2">
              <NavLink to="/dashboard" className={navClass}>
                Dashboard
              </NavLink>

              {(user?.role === "admin" || user?.role === "manager") && (
                <NavLink to="/users" className={navClass}>
                  Users
                </NavLink>
              )}

              {user?.role === "admin" && (
                <NavLink to="/create-user" className={navClass}>
                  Create User
                </NavLink>
              )}

              <NavLink to="/profile" className={navClass}>
                Profile
              </NavLink>
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-slate-500 capitalize">
                {user?.role || "No role"}
              </p>
            </div>

            <button onClick={handleLogout} className="btn-danger">
              Logout
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden btn-secondary"
          >
            Menu
          </button>
        </div>

        {menuOpen && (
          <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:hidden">
            <div className="mb-3 border-b border-slate-200 pb-3">
              <p className="text-sm font-semibold text-slate-800">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-slate-500 capitalize">
                {user?.role || "No role"}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <NavLink to="/dashboard" className={navClass} onClick={() => setMenuOpen(false)}>
                Dashboard
              </NavLink>

              {(user?.role === "admin" || user?.role === "manager") && (
                <NavLink to="/users" className={navClass} onClick={() => setMenuOpen(false)}>
                  Users
                </NavLink>
              )}

              {user?.role === "admin" && (
                <NavLink to="/create-user" className={navClass} onClick={() => setMenuOpen(false)}>
                  Create User
                </NavLink>
              )}

              <NavLink to="/profile" className={navClass} onClick={() => setMenuOpen(false)}>
                Profile
              </NavLink>

              <button onClick={handleLogout} className="btn-danger mt-2">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;