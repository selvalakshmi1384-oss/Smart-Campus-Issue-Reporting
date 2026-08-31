import Layout from "../../components/Layout";
import StatsCard from "../../components/StatsCard";
import { useIssues } from "../../context/IssueContext";
import { useUsers } from "../../context/UserContext";

export default function AdminDashboard() {
  const { issues } = useIssues();
  const { users } = useUsers();

  const totalUsers = users.length;
  const totalIssues = issues.length;

  const pending = issues.filter(
    (issue) => issue.status === "Pending"
  ).length;

  const inProgress = issues.filter(
    (issue) => issue.status === "In Progress"
  ).length;

  const resolved = issues.filter(
    (issue) => issue.status === "Resolved"
  ).length;

  const recentIssues = [...issues].reverse().slice(0, 5);

  const styles = {
    container: {
      padding: "20px",
    },

    title: {
      marginBottom: "10px",
    },

    subtitle: {
      color: "#6b7280",
      marginBottom: "25px",
    },

    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
      marginBottom: "35px",
    },

    section: {
      marginTop: "20px",
    },

    activityCard: {
      background: "#fff",
      padding: "16px",
      marginBottom: "15px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    },

    activityTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "6px",
    },

    activityText: {
      color: "#6b7280",
      fontSize: "14px",
      lineHeight: "22px",
    },

    status: {
      marginTop: "10px",
      display: "inline-block",
      padding: "6px 12px",
      borderRadius: "20px",
      fontWeight: "bold",
      fontSize: "13px",
    },

    pending: {
      background: "#FEF3C7",
      color: "#B45309",
    },

    progress: {
      background: "#DBEAFE",
      color: "#1D4ED8",
    },

    resolved: {
      background: "#D1FAE5",
      color: "#047857",
    },

    empty: {
      background: "#fff",
      padding: "40px",
      borderRadius: "12px",
      textAlign: "center",
      color: "#6b7280",
      boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      fontSize: "16px",
    },
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.title}>🛠 Admin Dashboard</h2>

        <p style={styles.subtitle}>
          Monitor registered users and campus issues.
        </p>

        <div style={styles.statsGrid}>
          <StatsCard
            title="Registered Users"
            value={totalUsers}
            color="#8B5CF6"
            icon="👥"
          />

          <StatsCard
            title="Total Issues"
            value={totalIssues}
            color="#4F46E5"
            icon="📋"
          />

          <StatsCard
            title="Pending"
            value={pending}
            color="#F59E0B"
            icon="⏳"
          />

          <StatsCard
            title="In Progress"
            value={inProgress}
            color="#3B82F6"
            icon="🔧"
          />

          <StatsCard
            title="Resolved"
            value={resolved}
            color="#10B981"
            icon="✅"
          />
        </div>

        <div style={styles.section}>
          <h3>📌 Recent Issues</h3>

          {recentIssues.length === 0 ? (
            <div style={styles.empty}>
              No issues reported yet.
            </div>
          ) : (
            recentIssues.map((issue) => (
              <div key={issue.id} style={styles.activityCard}>
                <div style={styles.activityTitle}>
                  {issue.title}
                </div>

                <div style={styles.activityText}>
                  <strong>Reported By:</strong> {issue.reportedBy}
                  <br />
                  <strong>Category:</strong> {issue.category}
                  <br />
                  <strong>Location:</strong> {issue.location}
                  <br />
                  <strong>Priority:</strong> {issue.priority}
                </div>

                <span
                  style={{
                    ...styles.status,
                    ...(issue.status === "Pending"
                      ? styles.pending
                      : issue.status === "In Progress"
                      ? styles.progress
                      : styles.resolved),
                  }}
                >
                  {issue.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}