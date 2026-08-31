import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUsers } from "../context/UserContext";

export default function Register() {
  const navigate = useNavigate();
  const { addUser } = useUsers();

  const [role, setRole] = useState("student");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.department ||
      !form.year ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const success = addUser({
      name: form.name,
      email: form.email,
      phone: form.phone,
      department: form.department,
      year: form.year,
      password: form.password,
      role: role,
    });

    if (!success) {
      setError("Email already registered.");
      return;
    }

    setError("");

    alert("Registration Successful ✅");

    navigate("/login");
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg,#4f46e5,#9333ea)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },

    card: {
      width: "500px",
      background: "white",
      borderRadius: "20px",
      padding: "35px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    },

    title: {
      textAlign: "center",
      color: "#4f46e5",
      marginBottom: "8px",
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
      background: "#f3f4f6",
      cursor: "pointer",
      fontWeight: "bold",
    },

    activeBtn: {
      flex: 1,
      padding: "12px",
      borderRadius: "10px",
      border: "none",
      background: "#4f46e5",
      color: "white",
      cursor: "pointer",
      fontWeight: "bold",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "15px",
    },

    fullWidth: {
      gridColumn: "1 / span 2",
    },

    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
    },

    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      fontSize: "15px",
      boxSizing: "border-box",
    },

    passwordBox: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
    },

    showBtn: {
      width: "90px",
      padding: "12px",
      background: "#4f46e5",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold",
    },

    error: {
      color: "#ef4444",
      textAlign: "center",
      marginTop: "15px",
      fontWeight: "bold",
    },

    registerBtn: {
      width: "100%",
      marginTop: "25px",
      padding: "14px",
      background: "#4f46e5",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
    },

    login: {
      textAlign: "center",
      marginTop: "20px",
    },

    loginLink: {
      color: "#4f46e5",
      fontWeight: "bold",
      textDecoration: "none",
    },

    home: {
      display: "block",
      textAlign: "center",
      marginTop: "15px",
      color: "#6b7280",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <motion.form
        style={styles.card}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={styles.title}>📝 Create Account</h2>

        <p style={styles.subtitle}>
          Register to Smart Campus
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

        <div style={styles.grid}>
          <div>
            <label style={styles.label}>Full Name</label>
            <input
              name="name"
              style={styles.input}
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              style={styles.input}
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label style={styles.label}>Phone</label>
            <input
              name="phone"
              style={styles.input}
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label style={styles.label}>Department</label>
            <input
              name="department"
              placeholder="CSE"
              style={styles.input}
              value={form.department}
              onChange={handleChange}
            />
          </div>

          <div>
            <label style={styles.label}>Year</label>
            <select
              name="year"
              style={styles.input}
              value={form.year}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>I Year</option>
              <option>II Year</option>
              <option>III Year</option>
              <option>IV Year</option>
            </select>
          </div>

          <div style={styles.fullWidth}>
            <label style={styles.label}>Password</label>

            <div style={styles.passwordBox}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                style={styles.input}
                value={form.password}
                onChange={handleChange}
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

          <div style={styles.fullWidth}>
            <label style={styles.label}>Confirm Password</label>

            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              style={styles.input}
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <button type="submit" style={styles.registerBtn}>
          Register
        </button>

        <div style={styles.login}>
          Already have an account?{" "}
          <Link to="/login" style={styles.loginLink}>
            Login
          </Link>
        </div>

        <Link to="/" style={styles.home}>
          ← Back to Home
        </Link>
      </motion.form>
    </div>
  );
}