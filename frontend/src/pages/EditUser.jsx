import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import AlertMessage from "../components/AlertMessage";
import LoadingSpinner from "../components/LoadingSpinner";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState("active");

  const [loading, setLoading] = useState(true);
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

  return (
    <div className="page-container">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-10">
        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
            <LoadingSpinner text="Loading user..." />
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-6 text-white">
              <h1 className="text-2xl font-bold">Edit User</h1>
              <p className="mt-1 text-sm text-orange-100">
                Update user details, role, status, or password
              </p>
            </div>

            <div className="p-6">
              <button
                onClick={() => navigate("/users")}
                className="mb-5 inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-800 hover:underline"
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                  />
                </div>

                <div>
                  <label className="label">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                  />
                </div>

                <div>
                  <label className="label">New Password</label>
                  <input
                    type="password"
                    placeholder="Leave blank to keep current password"
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

                <button
                  type="submit"
                  disabled={submitLoading}
                  className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 font-semibold text-white shadow-md transition hover:from-amber-600 hover:to-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitLoading ? "Updating User..." : "Update User"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditUser;