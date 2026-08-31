import Layout from "../../components/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useIssues } from "../../context/IssueContext";
import { useAuth } from "../../context/AuthContext";

export default function MyIssues() {
  const { issues } = useIssues();
  const { user } = useAuth();

  // Logged in student's issues
  const myIssues = issues.filter(
    (issue) => issue.reportedByEmail === user?.email
  );

  // Filters
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priority, setPriority] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const resetFilter = () => {
  setFilter("All");
  setSearch("");
  setCategory("All");
  setPriority("All");
  setSortBy("Newest");
};

  // Filtering Logic
  const filteredIssues = myIssues.filter((issue) => {
    const statusMatch =
      filter === "All" || issue.status === filter;

    const categoryMatch =
      category === "All" ||
      issue.category === category;

    const priorityMatch =
      priority === "All" ||
      issue.priority === priority;

    const searchMatch =
      issue.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      issue.description
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      issue.location
        .toLowerCase()
        .includes(search.toLowerCase());

    return (
      statusMatch &&
      categoryMatch &&
      priorityMatch &&
      searchMatch
    );
  });
const sortedIssues = [...filteredIssues];

if (sortBy === "Newest") {
  sortedIssues.sort((a, b) => b.id - a.id);
}

if (sortBy === "Oldest") {
  sortedIssues.sort((a, b) => a.id - b.id);
}

if (sortBy === "High") {
  const order = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  sortedIssues.sort(
    (a, b) => order[a.priority] - order[b.priority]
  );
}

if (sortBy === "Low") {
  const order = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  sortedIssues.sort(
    (a, b) => order[a.priority] - order[b.priority]
  );
}
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

 return (
  <Layout>
    <div style={styles.container}>

      <h2 style={styles.title}>📋 My Issues</h2>

      <p style={styles.subtitle}>
        View and track all issues you have reported.
      </p>

      {/* Filter Panel */}

      <div style={styles.filterPanel}>

        <input
          type="text"
          placeholder="🔍 Search by title, description or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        <div style={styles.dropdownRow}>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.dropdown}
          >
            <option value="All">All Categories</option>
            <option value="Electrical">Electrical</option>
            <option value="Water">Water</option>
            <option value="Internet">Internet</option>
            <option value="Furniture">Furniture</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Others">Others</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={styles.dropdown}
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  style={styles.dropdown}
>
  <option value="Newest">Newest First</option>
  <option value="Oldest">Oldest First</option>
  <option value="High">High Priority</option>
  <option value="Low">Low Priority</option>
</select>

        </div>

        <div style={styles.filterBox}>

          {["All", "Pending", "In Progress", "Resolved"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                style={{
                  ...styles.filterBtn,
                  ...(filter === item
                    ? styles.activeBtn
                    : {}),
                }}
              >
                {item}
              </button>
            )
          )}

          <button
            onClick={resetFilter}
            style={styles.resetBtn}
          >
            🔄 Reset
          </button>

        </div>

      </div>

      {/* Issues List */}

      <div style={styles.table}>

        {sortedIssues.length > 0 ? (

  sortedIssues.map((issue) => (

            <div
              key={issue.id}
              style={styles.row}
            >

              <div style={styles.left}>

                <h3 style={styles.issueTitle}>
                  {issue.title}
                </h3>

                <span style={styles.category}>
                  📂 {issue.category}
                </span>

                <span style={styles.location}>
                  📍 {issue.location}
                </span>

                <span style={styles.priority}>
                  🚨 {issue.priority}
                </span>

              </div>

              <div style={styles.right}>

                <span
                  style={{
                    ...styles.status,
                    ...getStatusStyle(issue.status),
                  }}
                >
                  {issue.status}
                </span>

                <Link
                  to={`/student/issues/${issue.id}`}
                  style={styles.detailsBtn}
                >
                  View Details →
                </Link>

              </div>

            </div>

          ))

        ) : (

          <div style={styles.empty}>

            <h3>No Issues Found</h3>

            <p>
              No issues match your filters.
            </p>

          </div>

        )}

      </div>

    </div>
  </Layout>
);}
const styles = {
  container: {
    padding: "20px",
  },

  title: {
    marginBottom: "8px",
    fontSize: "28px",
    color: "#111827",
  },

  subtitle: {
    color: "#6b7280",
    marginBottom: "25px",
  },

  /* ---------- Filter Panel ---------- */

  filterPanel: {
    background: "#ffffff",
    padding: "22px",
    borderRadius: "15px",
    marginBottom: "30px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  },

  search: {
    width: "100%",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    marginBottom: "20px",
    outline: "none",
    boxSizing: "border-box",
  },

  dropdownRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
    marginBottom: "20px",
  },

  dropdown: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    background: "#fff",
    cursor: "pointer",
    boxSizing: "border-box",
  },

  filterBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    alignItems: "center",
  },

  filterBtn: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    background: "#e5e7eb",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },

  activeBtn: {
    background: "#4f46e5",
    color: "#fff",
  },

  resetBtn: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    background: "#ef4444",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },

  /* ---------- Issues ---------- */

  table: {
    background: "#fff",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #eee",
    flexWrap: "wrap",
    gap: "15px",
  },

  left: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  issueTitle: {
    margin: 0,
    fontSize: "18px",
  },

  category: {
    color: "#6b7280",
    fontSize: "14px",
  },

  location: {
    color: "#6b7280",
    fontSize: "14px",
  },

  priority: {
    color: "#ef4444",
    fontWeight: "bold",
    fontSize: "14px",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
  },

  status: {
    padding: "8px 14px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "13px",
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

  detailsBtn: {
    textDecoration: "none",
    padding: "8px 14px",
    border: "1px solid #4f46e5",
    borderRadius: "8px",
    color: "#4f46e5",
    fontWeight: "bold",
  },

  empty: {
    padding: "50px 20px",
    textAlign: "center",
    color: "#6b7280",
  },
};