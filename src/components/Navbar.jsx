import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // 🔥 redirect after logout
  };

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo}>🏫 Smart Campus</h2>

      <div style={styles.right}>
        <span style={styles.user}>
          {user ? user.role : "Not Logged In"}
        </span>

        <button
          style={styles.btn}
          onClick={handleLogout}
          disabled={!user}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    height: "60px",
    background: "linear-gradient(135deg, #4f46e5, #9333ea)",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },

  logo: {
    margin: 0,
    fontSize: "20px",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  user: {
    background: "rgba(255,255,255,0.2)",
    padding: "5px 10px",
    borderRadius: "8px",
    fontSize: "14px",
  },

  btn: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    background: "white",
    color: "#4f46e5",
    fontWeight: "bold",
  },
};