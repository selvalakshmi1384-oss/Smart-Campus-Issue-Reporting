import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import StudentDashboard from "./pages/student/StudentDashboard";
import ReportIssue from "./pages/student/ReportIssue";
import MyIssues from "./pages/student/MyIssues";
import IssueDetails from "./pages/student/IssueDetails";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageIssues from "./pages/admin/ManageIssues";
import Users from "./pages/admin/Users";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Public Pages */}

      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />



      {/* Student Routes */}

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/report"
        element={
          <ProtectedRoute allowedRole="student">
            <ReportIssue />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/issues"
        element={
          <ProtectedRoute allowedRole="student">
            <MyIssues />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/issues/:id"
        element={
          <ProtectedRoute allowedRole="student">
            <IssueDetails />
          </ProtectedRoute>
        }
      />



      {/* Admin Routes */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/issues"
        element={
          <ProtectedRoute allowedRole="admin">
            <ManageIssues />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRole="admin">
            <Users />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;