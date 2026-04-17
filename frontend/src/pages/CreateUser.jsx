import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import api from "../services/api";
import AlertMessage from "../components/AlertMessage";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState("active");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/users", {
        name,
        email,
        password,
        role,
        status,
      });

      setSuccess("User created successfully");

      setTimeout(() => {
        navigate("/users");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-white">
            <h1 className="text-2xl font-bold">Create New User</h1>
            <p className="mt-1 text-sm text-blue-100">
              Add a new user and assign role and account status
            </p>
          </div>

          <div className="p-6">
            <button
              onClick={() => navigate("/users")}
              className="mb-5 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              ← Back to Users
            </button>

            <div className="space-y-4 mb-4">
              <AlertMessage type="error" message={error} />
              <AlertMessage type="success" message={success} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                />
              </div>

              <div>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>

              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  placeholder="Enter secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="label">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="select"
                  >
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="label">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="select"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating User..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;