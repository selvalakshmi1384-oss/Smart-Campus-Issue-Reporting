import { Link } from "react-router-dom";

export default function NotFound() {
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#f9fafb",
      textAlign: "center",
      padding: "20px",
    },

    title: {
      fontSize: "80px",
      color: "#4f46e5",
      margin: 0,
    },

    subtitle: {
      fontSize: "24px",
      margin: "10px 0",
      color: "#111827",
    },

    text: {
      color: "#6b7280",
      marginBottom: "25px",
    },

    button: {
      background: "#4f46e5",
      color: "white",
      textDecoration: "none",
      padding: "12px 22px",
      borderRadius: "8px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>

      <h2 style={styles.subtitle}>Page Not Found</h2>

      <p style={styles.text}>
        The page you are looking for does not exist.
      </p>

      <Link to="/" style={styles.button}>
        Back to Home
      </Link>
    </div>
  );
}