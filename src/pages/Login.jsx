import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useUsers } from "../context/UserContext";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();
  const { users } = useUsers();

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    const foundUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password &&
        user.role === role
    );

    if (!foundUser) {
      setError("Invalid email, password or role.");
      return;
    }

    if (foundUser.status === "Blocked") {
      setError("Your account has been blocked.");
      return;
    }

    setError("");

    // Login with complete user object
    login(foundUser);

    if (foundUser.role === "student") {
      navigate("/student/dashboard");
    } else {
      navigate("/admin/dashboard");
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg,#4f46e5,#9333ea)",
      padding: "20px",
    },

    card: {
      width: "420px",
      background: "#fff",
      borderRadius: "20px",
      padding: "35px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    },

    title: {
      textAlign: "center",
      marginBottom: "10px",
      color: "#4f46e5",
    },

    subtitle: {
      textAlign: "center",
      color: "#6b7280",
      marginBottom: "25px",
    },

    roleBox: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
    },

    btn: {
      flex: 1,
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      cursor: "pointer",
      background: "#f3f4f6",
      fontWeight: "bold",
    },

    activeBtn: {
      flex: 1,
      padding: "12px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      background: "#4f46e5",
      color: "#fff",
      fontWeight: "bold",
    },

    inputGroup: {
      marginBottom: "18px",
    },

    label: {
      display: "block",
      marginBottom: "6px",
      fontWeight: "bold",
    },

    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      fontSize: "15px",
      boxSizing: "border-box",
    },

    passwordRow: {
      display: "flex",
      gap: "10px",
    },

    showBtn: {
      width: "90px",
      border: "none",
      background: "#4f46e5",
      color: "white",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold",
    },

    options: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      fontSize: "14px",
    },

    checkbox: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },

    forgot: {
      color: "#4f46e5",
      textDecoration: "none",
      fontWeight: "bold",
    },

    error: {
      color: "#ef4444",
      textAlign: "center",
      marginBottom: "15px",
      fontWeight: "bold",
    },

    loginBtn: {
      width: "100%",
      padding: "14px",
      border: "none",
      borderRadius: "10px",
      background: "#4f46e5",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
    },

    register: {
      textAlign: "center",
      marginTop: "20px",
    },

    registerLink: {
      color: "#4f46e5",
      textDecoration: "none",
      fontWeight: "bold",
    },

    home: {
      display: "block",
      textAlign: "center",
      marginTop: "15px",
      textDecoration: "none",
      color: "#6b7280",
    },
  };
    return (
    <div style={styles.container}>
      <motion.form
        style={styles.card}
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={styles.title}>🏫 Smart Campus Login</h2>

        <p style={styles.subtitle}>
          Sign in to continue
        </p>

        <div style={styles.roleBox}>
          <button
            type="button"
            style={role === "student" ? styles.activeBtn : styles.btn}
            onClick={() => setRole("student")}
          >
            🎓 Student
          </button>

          <button
            type="button"
            style={role === "admin" ? styles.activeBtn : styles.btn}
            onClick={() => setRole("admin")}
          >
            🛠 Admin
          </button>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>

          <div style={styles.passwordRow}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              style={styles.showBtn}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div style={styles.options}>
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            Remember Me
          </label>

          <Link to="#" style={styles.forgot}>
            Forgot Password?
          </Link>
        </div>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <button
          type="submit"
          style={styles.loginBtn}
        >
          Login as {role === "student" ? "Student" : "Admin"}
        </button>

        <div style={styles.register}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={styles.registerLink}
          >
            Register
          </Link>
        </div>

        <Link
          to="/"
          style={styles.home}
        >
          ← Back to Home
        </Link>
      </motion.form>
    </div>
  );
}