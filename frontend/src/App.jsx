import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager"]}>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-user"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/:id/edit"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager"]}>
              <EditUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager", "user"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;