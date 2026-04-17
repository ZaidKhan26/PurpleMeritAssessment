import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../services/api";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import AlertMessage from "../components/AlertMessage";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    admins: 0,
    managers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      if (user?.role === "admin" || user?.role === "manager") {
        const res = await api.get("/users", {
          params: {
            page: 1,
            limit: 100,
          },
        });

        const users = res.data.users || [];

        const total = users.length;
        const active = users.filter((u) => u.status === "active").length;
        const inactive = users.filter((u) => u.status === "inactive").length;
        const admins = users.filter((u) => u.role === "admin").length;
        const managers = users.filter((u) => u.role === "manager").length;

        setStats({ total, active, inactive, admins, managers });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="page-container">
      <Navbar />

      <div className="page-content">
        <PageHeader
          title={`Welcome, ${user?.name || user?.email || "User"}`}
          subtitle="Here is your system overview."
        />

        {error && <AlertMessage type="error" message={error} />}

        {loading ? (
          <LoadingSpinner text="Loading dashboard..." />
        ) : user?.role === "admin" || user?.role === "manager" ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            <div className="stats-card">
              <p className="text-sm text-slate-500">Total Users</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-800">{stats.total}</h3>
            </div>

            <div className="stats-card">
              <p className="text-sm text-green-600">Active Users</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-800">{stats.active}</h3>
            </div>

            <div className="stats-card">
              <p className="text-sm text-red-600">Inactive Users</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-800">{stats.inactive}</h3>
            </div>

            <div className="stats-card">
              <p className="text-sm text-purple-600">Admins</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-800">{stats.admins}</h3>
            </div>

            <div className="stats-card">
              <p className="text-sm text-blue-600">Managers</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-800">{stats.managers}</h3>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-body">
              <h3 className="text-lg font-semibold text-slate-800">My Account</h3>
              <p className="mt-2 text-sm text-slate-600">
                You are logged in successfully. Use the Profile page to view and update your account details.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Name</p>
                  <p className="mt-1 font-semibold text-slate-800">{user?.name}</p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="mt-1 font-semibold text-slate-800">{user?.email}</p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Role</p>
                  <p className="mt-1 font-semibold capitalize text-slate-800">{user?.role}</p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Status</p>
                  <p className="mt-1 font-semibold capitalize text-slate-800">{user?.status}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;