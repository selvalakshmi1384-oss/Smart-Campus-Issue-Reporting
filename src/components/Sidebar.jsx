import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <div style={styles.sidebar}>
      <h3 style={styles.title}>📌 Menu</h3>

      {user?.role === "student" ? (
        <>
          <NavLink
            to="/student/dashboard"
            style={({ isActive }) => ({
              ...styles.link,
              background: isActive ? "#4f46e5" : "rgba(255,255,255,0.05)",
            })}
          >
            🏠 Dashboard
          </NavLink>

          <NavLink
            to="/student/report"
            style={({ isActive }) => ({
              ...styles.link,
              background: isActive ? "#4f46e5" : "rgba(255,255,255,0.05)",
            })}
          >
            📝 Report Issue
          </NavLink>

          <NavLink
            to="/student/issues"
            style={({ isActive }) => ({
              ...styles.link,
              background: isActive ? "#4f46e5" : "rgba(255,255,255,0.05)",
            })}
          >
            📋 My Issues
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/admin/dashboard"
            style={({ isActive }) => ({
              ...styles.link,
              background: isActive ? "#4f46e5" : "rgba(255,255,255,0.05)",
            })}
          >
            🏠 Dashboard
          </NavLink>

          <NavLink
            to="/admin/issues"
            style={({ isActive }) => ({
              ...styles.link,
              background: isActive ? "#4f46e5" : "rgba(255,255,255,0.05)",
            })}
          >
            🛠 Manage Issues
          </NavLink>

          <NavLink
            to="/admin/users"
            style={({ isActive }) => ({
              ...styles.link,
              background: isActive ? "#4f46e5" : "rgba(255,255,255,0.05)",
            })}
          >
            👥 Users
          </NavLink>
        </>
      )}
    </div>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    height: "100vh",
    background: "#111827",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    position: "sticky",
    top: 0,
  },

  title: {
    marginBottom: "10px",
    fontSize: "18px",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    paddingBottom: "10px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "14px",
    transition: "0.3s",
  },
};