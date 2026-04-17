import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    admins: 0,
    managers: 0,
  });

  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchStats = async () => {
    try {
      const res = await api.get("/users");

      const users = res.data.users || [];

      const total = users.length;
      const active = users.filter(u => u.status === "active").length;
      const inactive = users.filter(u => u.status === "inactive").length;
      const admins = users.filter(u => u.role === "admin").length;
      const managers = users.filter(u => u.role === "manager").length;

      setStats({ total, active, inactive, admins, managers });
    } catch (err) {
      return err.response?.data?.message || "internel server error";
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Welcome, {user?.email}
          </h1>
          <p className="text-gray-600">
            Here is your system overview
          </p>
        </div>

        {/* Stats */}
        {loading ? (
          <p>Loading stats...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-gray-500 text-sm">Total Users</h3>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>

            <div className="bg-green-100 p-4 rounded-xl shadow">
              <h3 className="text-green-700 text-sm">Active</h3>
              <p className="text-2xl font-bold">{stats.active}</p>
            </div>

            <div className="bg-red-100 p-4 rounded-xl shadow">
              <h3 className="text-red-700 text-sm">Inactive</h3>
              <p className="text-2xl font-bold">{stats.inactive}</p>
            </div>

            <div className="bg-blue-100 p-4 rounded-xl shadow">
              <h3 className="text-blue-700 text-sm">Admins</h3>
              <p className="text-2xl font-bold">{stats.admins}</p>
            </div>

            <div className="bg-yellow-100 p-4 rounded-xl shadow">
              <h3 className="text-yellow-700 text-sm">Managers</h3>
              <p className="text-2xl font-bold">{stats.managers}</p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;