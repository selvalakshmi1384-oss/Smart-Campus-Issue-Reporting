export default function IssueCard({ issue }) {
  const styles = {
    card: {
      background: "white",
      padding: "15px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
    },

    left: {
      display: "flex",
      flexDirection: "column",
    },

    title: {
      fontWeight: "bold",
      marginBottom: "5px",
    },

    category: {
      fontSize: "12px",
      color: "#6b7280",
    },

    statusBase: {
      padding: "5px 10px",
      borderRadius: "8px",
      fontSize: "12px",
      fontWeight: "bold",
    },

    pending: {
      color: "#f59e0b",
      background: "#fff7ed",
    },

    resolved: {
      color: "#10b981",
      background: "#ecfdf5",
    },

    inprogress: {
      color: "#3b82f6",
      background: "#eff6ff",
    },
  };

  const getStatusStyle = (status) => {
    if (status === "Pending") return styles.pending;
    if (status === "Resolved") return styles.resolved;
    return styles.inprogress;
  };

  return (
    <div style={styles.card}>
      <div style={styles.left}>
        <div style={styles.title}>{issue.title}</div>
        <div style={styles.category}>{issue.category}</div>
      </div>

      <div
        style={{
          ...styles.statusBase,
          ...getStatusStyle(issue.status),
        }}
      >
        {issue.status}
      </div>
    </div>
  );
}