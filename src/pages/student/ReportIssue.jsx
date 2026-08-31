import Layout from "../../components/Layout";
import { useState } from "react";
import { useIssues } from "../../context/IssueContext";
import { useAuth } from "../../context/AuthContext";
import CryptoJS from "crypto-js";

export default function ReportIssue() {
  const { addIssue } = useIssues();
  const { user } = useAuth();

  const SECRET_KEY = "SmartCampusSecretKey";


  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "WiFi",
    priority: "Medium",
    location: "Library",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // Encrypt Description
  const encryptedDescription = CryptoJS.AES.encrypt(
    form.description,
    SECRET_KEY
  ).toString();

  console.log("Encrypted Description:", encryptedDescription);

  addIssue({
    title: form.title,
    description: encryptedDescription,
    category: form.category,
    priority: form.priority,
    location: form.location,
    reportedBy: user?.name || "Unknown",
    reportedByEmail: user?.email || "",
  });

  alert("✅ Issue Reported Successfully!");

  setForm({
    title: "",
    description: "",
    category: "WiFi",
    priority: "Medium",
    location: "Library",
  });
};

  const handleClear = () => {
    if (!window.confirm("Clear all entered details?")) return;

    setForm({
      title: "",
      description: "",
      category: "WiFi",
      priority: "Medium",
      location: "Library",
    });
  };

  const styles = {
    container: {
      padding: "25px",
    },

    title: {
      textAlign: "center",
      marginBottom: "8px",
    },

    subtitle: {
      textAlign: "center",
      color: "#6b7280",
      marginBottom: "25px",
    },

    form: {
      maxWidth: "650px",
      margin: "auto",
      background: "#fff",
      padding: "30px",
      borderRadius: "15px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
    },

    label: {
      fontWeight: "600",
      marginBottom: "5px",
      display: "block",
    },

    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "15px",
      marginBottom: "15px",
      boxSizing: "border-box",
    },

    textarea: {
      width: "100%",
      padding: "12px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      minHeight: "120px",
      resize: "vertical",
      fontSize: "15px",
      marginBottom: "15px",
      boxSizing: "border-box",
    },

    select: {
      width: "100%",
      padding: "12px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "15px",
      marginBottom: "15px",
      boxSizing: "border-box",
    },

    buttonGroup: {
      display: "flex",
      gap: "15px",
      marginTop: "20px",
    },

    button: {
      flex: 1,
      padding: "14px",
      background: "#4f46e5",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "16px",
    },

    clearButton: {
      flex: 1,
      padding: "14px",
      background: "#ef4444",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.title}>📝 Report a Campus Issue</h2>

        <p style={styles.subtitle}>
          Help improve the campus by reporting issues quickly.
        </p>

        <div style={styles.form}>
          <form onSubmit={handleSubmit}>

            <label style={styles.label}>Issue Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              placeholder="Enter issue title"
              onChange={handleChange}
              style={styles.input}
              required
            />

            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              value={form.description}
              placeholder="Describe the issue..."
              onChange={handleChange}
              style={styles.textarea}
              required
            />

            <label style={styles.label}>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              style={styles.select}
            >
              <option>WiFi</option>
              <option>Electrical</option>
              <option>Plumbing</option>
              <option>Classroom</option>
              <option>Hostel</option>
              <option>Library</option>
              <option>Sports</option>
              <option>Other</option>
            </select>

            <label style={styles.label}>Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              style={styles.select}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <label style={styles.label}>Location</label>
            <select
              name="location"
              value={form.location}
              onChange={handleChange}
              style={styles.select}
            >
              <option>Library</option>
              <option>Computer Lab</option>
              <option>Classroom</option>
              <option>Hostel</option>
              <option>Canteen</option>
              <option>Sports Ground</option>
              <option>Parking Area</option>
              <option>Administration Block</option>
            </select>

            <div style={styles.buttonGroup}>
              <button type="submit" style={styles.button}>
                🔐 Submit Securely
              </button>

              <button
                type="button"
                style={styles.clearButton}
                onClick={handleClear}
              >
                🗑 Clear
              </button>
            </div>

          </form>
        </div>
      </div>
    </Layout>
  );
}