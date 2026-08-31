import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  allowedRole,
}) {
  const { user } = useAuth();

  // User not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role not allowed
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  // Authorized
  return children;
}