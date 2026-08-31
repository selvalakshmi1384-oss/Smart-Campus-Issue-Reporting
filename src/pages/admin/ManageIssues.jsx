import Layout from "../../components/Layout";
import { useState } from "react";
import { useIssues } from "../../context/IssueContext";
export default function ManageIssues() {
  const { issues, updateStatus } = useIssues();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return styles.pending;

      case "In Progress":
        return styles.inProgress;

      case "Resolved":
        return styles.resolved;

      default:
        return {};
    }
  };
const filteredIssues = issues.filter((issue) => {
  const matchesSearch =
    issue.title.toLowerCase().includes(search.toLowerCase()) ||
    issue.category.toLowerCase().includes(search.toLowerCase()) ||
    issue.location.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" || issue.status === statusFilter;

  return matchesSearch && matchesStatus;
});
  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.title}>🛠 Manage Issues</h2>

        <p style={styles.subtitle}>
          View all reported campus issues and update their current status.
        </p>
        <div style={styles.searchBox}>
  <input
    type="text"
    placeholder="🔍 Search by title, category or location..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={styles.searchInput}
  />
</div>
<div style={styles.filterBox}>
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    style={styles.filterSelect}
  >
    <option value="All">All Status</option>
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
    <option value="Resolved">Resolved</option>
  </select>
</div>
        <div style={styles.table}>
          <div style={{ ...styles.row, ...styles.header }}>
            <div>ID</div>
            <div>Issue</div>
            <div>Reported By</div>
            <div>Location</div>
            <div>Priority</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => (
              <div key={issue.id} style={styles.row}>
                <div>#{issue.id}</div>

                <div>
                  <strong>{issue.title}</strong>

                  <div style={styles.category}>
                    {issue.category}
                  </div>
                </div>

                <div>{issue.reportedBy}</div>

                <div>{issue.location}</div>

                <div>
                  <span
                    style={{
                      ...styles.priority,
                      ...(issue.priority === "High"
                        ? styles.high
                        : issue.priority === "Medium"
                        ? styles.medium
                        : styles.low),
                    }}
                  >
                    {issue.priority}
                  </span>
                </div>

                <div>
                  <span
                    style={{
                      ...styles.badge,
                      ...getStatusStyle(issue.status),
                    }}
                  >
                    {issue.status}
                  </span>
                </div>

                <div>
                  <select
                    style={styles.select}
                    value={issue.status}
                    onChange={(e) =>
                      updateStatus(issue.id, e.target.value)
                    }
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.empty}>
              No issues reported yet.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

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

  table: {
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },

  row: {
    display: "grid",
    gridTemplateColumns:
      "0.7fr 2fr 2fr 1.5fr 1fr 1.2fr 1.6fr",
    alignItems: "center",
    gap: "12px",
    padding: "15px",
    borderBottom: "1px solid #eee",
  },

  header: {
    background: "#f3f4f6",
    fontWeight: "bold",
  },

  category: {
    marginTop: "4px",
    fontSize: "12px",
    color: "#6b7280",
  },

  badge: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "bold",
    display: "inline-block",
    textAlign: "center",
  },

  pending: {
    background: "#fef3c7",
    color: "#b45309",
  },

  inProgress: {
    background: "#dbeafe",
    color: "#2563eb",
  },

  resolved: {
    background: "#dcfce7",
    color: "#15803d",
  },

  priority: {
    padding: "5px 10px",
    borderRadius: "20px",
    fontWeight: "bold",
    display: "inline-block",
    textAlign: "center",
    fontSize: "13px",
  },

  high: {
    background: "#fee2e2",
    color: "#dc2626",
  },

  medium: {
    background: "#fef3c7",
    color: "#b45309",
  },

  low: {
    background: "#dcfce7",
    color: "#15803d",
  },

  select: {
    width: "100%",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    outline: "none",
    cursor: "pointer",
  },

  empty: {
    padding: "30px",
    textAlign: "center",
    color: "#6b7280",
  },
  searchBox: {
  marginBottom: "20px",
},

searchInput: {
  width: "100%",
  padding: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
},
filterBox: {
  marginBottom: "20px",
},

filterSelect: {
  width: "220px",
  padding: "10px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "15px",
  outline: "none",
},
};