import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState("active");

  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get(`/users/${id}`);
      const user = res.data.user;

      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "user");
      setStatus(user.status || "active");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setSubmitLoading(true);

      const payload = {
        name,
        email,
        role,
        status,
      };

      if (password.trim()) {
        payload.password = password;
      }

      await api.patch(`/users/${id}`, payload);

      setSuccess("User updated successfully");

      setTimeout(() => {
        navigate("/users");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <p className="text-gray-500 text-center">Loading user...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-white/60 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-6 text-white">
            <h2 className="text-2xl font-bold">Edit User</h2>
            <p className="text-sm text-orange-100 mt-1">
              Update user details, role, status, or password
            </p>
          </div>

          <div className="p-6">
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="mb-5 inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-800"
            >
              ← Back to Users
            </button>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-300 bg-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-300 bg-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter New Password (optional)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-slate-300 bg-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border border-slate-300 bg-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                  >
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border border-slate-300 bg-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {success && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {success}
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3 rounded-xl shadow-md hover:from-amber-600 hover:to-orange-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitLoading ? "Updating User..." : "Update User"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser;