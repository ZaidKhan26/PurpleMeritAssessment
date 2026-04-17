import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import AlertMessage from "../components/AlertMessage";
import RoleBadge from "../components/RoleBadge";
import StatusBadge from "../components/StatusBadge";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/users", {
        params: { search, page, limit: 5, role, status },
      });

      setUsers(res.data.users);
      setTotalPages(res.data.pagination.totalPages || 1);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, page, role, status]);

  const handleDeactivate = async (id) => {
    const confirm = window.confirm("Are you sure you want to deactivate this user?");
    if (!confirm) return;

    try {
      await api.patch(`/users/${id}/deactivate`);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to deactivate user");
    }
  };

  return (
    <div className="page-container">
      <Navbar />

      <div className="page-content">
        <PageHeader
          title="Users"
          subtitle="Manage all users, roles, and statuses"
          action={
            currentUser?.role === "admin" && (
              <button
                onClick={() => navigate("/create-user")}
                className="btn-primary"
              >
                + Create User
              </button>
            )
          }
        />

        <AlertMessage type="error" message={error} />

        <div className="card mb-5">
          <div className="card-body flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="input w-64"
            />

            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setPage(1);
              }}
              className="select"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="select"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner text="Loading users..." />
        ) : users.length === 0 ? (
          <div className="card">
            <div className="card-body text-center text-slate-500">
              No users found
            </div>
          </div>
        ) : (
          <>
            <div className="table-wrapper">
              <table className="w-full">
                <thead className="table-head">
                  <tr>
                    <th className="table-cell">Name</th>
                    <th className="table-cell">Email</th>
                    <th className="table-cell">Role</th>
                    <th className="table-cell">Status</th>
                    <th className="table-cell">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-t">
                      <td className="table-cell font-medium">{user.name}</td>
                      <td className="table-cell">{user.email}</td>
                      <td className="table-cell">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="table-cell">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="table-cell">
                        <div className="flex gap-2">
                          {(currentUser?.role === "admin" ||
                            currentUser?.role === "manager") && (
                            <button
                              onClick={() => navigate(`/users/${user._id}/edit`)}
                              className="btn-warning"
                            >
                              Edit
                            </button>
                          )}

                          {currentUser?.role === "admin" && (
                            <button
                              onClick={() => handleDeactivate(user._id)}
                              disabled={user.status === "inactive"}
                              className="btn-danger"
                            >
                              Deactivate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-5">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="btn-secondary"
              >
                Previous
              </button>

              <span className="text-sm text-slate-600">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="btn-secondary"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Users;