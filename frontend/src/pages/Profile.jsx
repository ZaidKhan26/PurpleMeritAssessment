import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Profile() {

    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await api.get("/auth/me");
            setUser(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch profile")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div>
            <Navbar />
            <h2>My Profile</h2>

            {loading && <p>Loading profile...</p>}
            {error && <p>{error}</p>}

            {!loading && user && (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Status:</strong> {user.status}</p>
                    <p><strong>CreatedAt:</strong> {new Date(user.createdAt).toLocaleString}</p>
                    <p><strong>UpdatedAt:</strong> {new Date(user.updatedAt).toLocaleString}</p>
                </div>
            )}
        </div>
    )
}

export default Profile;