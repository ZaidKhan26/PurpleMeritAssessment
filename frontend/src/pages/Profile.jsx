import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import AlertMessage from "../components/AlertMessage";
import RoleBadge from "../components/RoleBadge";
import StatusBadge from "../components/StatusBadge";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="page-container">
      <Navbar />

      <div className="page-content">
        <PageHeader
          title="My Profile"
          subtitle="View your personal account details."
        />

        {error && <AlertMessage type="error" message={error} />}

        {loading ? (
          <LoadingSpinner text="Loading profile..." />
        ) : user ? (
          <div className="card max-w-3xl">
            <div className="card-body space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Name</p>
                  <p className="mt-1 font-semibold text-slate-800">{user.name}</p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="mt-1 font-semibold text-slate-800">{user.email}</p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Role</p>
                  <div className="mt-2">
                    <RoleBadge role={user.role} />
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Status</p>
                  <div className="mt-2">
                    <StatusBadge status={user.status} />
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Created At</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {new Date(user.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Updated At</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {new Date(user.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Profile;