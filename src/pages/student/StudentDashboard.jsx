import Layout from "../../components/Layout";
import StatsCard from "../../components/StatsCard";
import { useIssues } from "../../context/IssueContext";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const { issues } = useIssues();
  const { user } = useAuth();

  // Show only the logged-in student's issues
  const myIssues = issues.filter(
  (issue) => issue.reportedByEmail === user?.email
);

  const total = myIssues.length;

  const pending = myIssues.filter(
    (issue) => issue.status === "Pending"
  ).length;

  const inProgress = myIssues.filter(
    (issue) => issue.status === "In Progress"
  ).length;

  const resolved = myIssues.filter(
    (issue) => issue.status === "Resolved"
  ).length;

  const recentIssues = myIssues
    .slice()
    .reverse()
    .slice(0, 5);

  const styles = {
    container: {
      padding: "20px",
    },

    title: {
      marginBottom: "8px",
    },

    subtitle: {
      color: "#6b7280",
      marginBottom: "25px",
    },

    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
    },

    section: {
      marginTop: "35px",
    },

    issueCard: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#fff",
      padding: "15px",
      marginTop: "12px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    },

    left: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },

    category: {
      color: "#6b7280",
      fontSize: "13px",
    },

    status: {
      padding: "6px 12px",
      borderRadius: "20px",
      fontWeight: "bold",
      fontSize: "13px",
    },

    pending: {
      background: "#fef3c7",
      color: "#b45309",
    },

    progress: {
      background: "#dbeafe",
      color: "#1d4ed8",
    },

    resolved: {
      background: "#d1fae5",
      color: "#047857",
    },

    reportBtn: {
      marginTop: "30px",
      display: "inline-block",
      padding: "14px 22px",
      background: "#4f46e5",
      color: "#fff",
      textDecoration: "none",
      borderRadius: "8px",
      fontWeight: "bold",
    },

    empty: {
      marginTop: "20px",
      padding: "25px",
      background: "#fff",
      borderRadius: "12px",
      textAlign: "center",
      color: "#6b7280",
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    },
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.title}>🎓 Student Dashboard</h2>

        <p style={styles.subtitle}>
          Welcome back! Track your reported campus issues.
        </p>

        <div style={styles.statsGrid}>
          <StatsCard
            title="Total Issues"
            value={total}
            color="#4f46e5"
            icon="📋"
          />

          <StatsCard
            title="Pending"
            value={pending}
            color="#f59e0b"
            icon="⏳"
          />

          <StatsCard
            title="In Progress"
            value={inProgress}
            color="#3b82f6"
            icon="🔧"
          />

          <StatsCard
            title="Resolved"
            value={resolved}
            color="#10b981"
            icon="✅"
          />
        </div>

        <div style={styles.section}>
          <h3>📌 My Recent Issues</h3>

          {recentIssues.length === 0 ? (
            <div style={styles.empty}>
              No issues reported yet.
            </div>
          ) : (
            recentIssues.map((issue) => (
              <div key={issue.id} style={styles.issueCard}>
                <div style={styles.left}>
                  <strong>{issue.title}</strong>

                  <span style={styles.category}>
                    {issue.category} • {issue.location}
                  </span>
                </div>

                <span
                  style={{
                    ...styles.status,
                    ...(issue.status === "Pending"
                      ? styles.pending
                      : issue.status === "Resolved"
                      ? styles.resolved
                      : styles.progress),
                  }}
                >
                  {issue.status}
                </span>
              </div>
            ))
          )}
        </div>

        <Link
          to="/student/report"
          style={styles.reportBtn}
        >
          ➕ Report New Issue
        </Link>
      </div>
    </Layout>
  );
}