import { useState } from "react";

export default function StatsCard({
  title,
  value,
  color = "#4f46e5",
  icon = "📊",
}) {
  const [hover, setHover] = useState(false);

  const styles = {
    card: {
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: hover
        ? "0 10px 20px rgba(0,0,0,0.18)"
        : "0 4px 12px rgba(0,0,0,0.08)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "0.3s",
      cursor: "pointer",
      transform: hover ? "translateY(-5px)" : "translateY(0px)",
    },

    left: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },

    title: {
      fontSize: "14px",
      color: "#6b7280",
      fontWeight: "500",
    },

    value: {
      fontSize: "28px",
      fontWeight: "700",
      color: color,
    },

    iconBox: {
      width: "55px",
      height: "55px",
      borderRadius: "50%",
      background: "#f3f4f6",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "26px",
      transition: "0.3s",
      transform: hover ? "scale(1.1)" : "scale(1)",
    },
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={styles.left}>
        <span style={styles.title}>{title}</span>
        <span style={styles.value}>{value}</span>
      </div>

      <div style={styles.iconBox}>{icon}</div>
    </div>
  );
}