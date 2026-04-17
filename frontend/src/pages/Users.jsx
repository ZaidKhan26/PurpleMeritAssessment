import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

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

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/users", {
        params: {
          search,
          page,
          limit: 5,
          role,
          status,
        },
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
  }, [role, status, page, search]);

  const handleDeactivate = async (id) => {
    try {
      await api.patch(`/users/${id}/deactivate`);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to deactivate user")
    }
  }

  return (
    <div>
      <Navbar />
      <h2>user List</h2>

      <div>
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <div>
        <label>
          Role filter:{" "}
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All</option>
            <option value="admin">admin</option>
            <option value="manager">manager</option>
            <option value="user">user</option>
          </select>
        </label>

        <label>
          Status filter:{" "}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All</option>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </label>
      </div>

      <button onClick={() => navigate("/create-user")}>Create User</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && users.length === 0 && <p>No users found</p>}

      {!loading && users.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td>
                    <button onClick={() => navigate(`/users/${user._id}/edit`)}>
                      Edit
                    </button>

                    <button onClick={() => handleDeactivate(user._id)} disabled={user.status === "inactive"}>
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "16px" }}>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Users;
