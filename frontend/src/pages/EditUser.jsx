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
    const [role, setRole] = useState("user")
    const [status, setStatus] = useState("active");

    const [loading, setLoading] = useState("false");
      const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState("")

     const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get(`/users/${id}`);
      const user = res.data.user;

      setName(user.name || "");
      setEmail(user.email || "")
      setRole(user.role || "user");
      setStatus(user.status || "active")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
        setSubmitLoading(true);

        const payload = {
            name,
            email,
            role,
            status,
        };

        if(password.trim()) {
            payload.password = password;
        }

        await api.patch(`/users/${id}`, payload);

        navigate("/users");
    } catch (err) {
        setError(err.response?.data?.message || "Failed to update user")
    } finally {
        setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
        <div>
            <Navbar />
            <p>Loading user...</p>
        </div>
    );
  }

    return (
        <div>
            <Navbar />
            <h2>Edit User</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div>
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">user</option>
                        <option value="manager">manager</option>
                        <option value="admin">admin</option>
                    </select>
                </div>

                <div>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                    </select>
                </div>

                {error && <p>{error}</p>}

                <button type="submit" disabled={submitLoading}>
                    {submitLoading ? "Updating..." : "Update User"}
                </button>
            </form>
        </div>
    )
}

export default EditUser;