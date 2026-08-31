import Layout from "../../components/Layout";
import { useParams, Link } from "react-router-dom";
import { useIssues } from "../../context/IssueContext";
import CryptoJS from "crypto-js";

export default function IssueDetails() {
  const { id } = useParams();
  const { issues } = useIssues();

  const SECRET_KEY = "SmartCampusSecretKey";

  const issue = issues.find(
    (item) => item.id === Number(id)
  );

  if (!issue) {
    return (
      <Layout>
        <div style={styles.notFound}>
          <h2>❌ Issue Not Found</h2>

          <p>The requested issue does not exist.</p>

          <Link
            to="/student/issues"
            style={styles.backBtn}
          >
            ← Back to My Issues
          </Link>
        </div>
      </Layout>
    );
  }

  // AES Decryption
  let decryptedDescription = "";

  try {
    decryptedDescription = CryptoJS.AES.decrypt(
      issue.description,
      SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
  } catch {
    decryptedDescription = issue.description;
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

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return styles.high;

      case "Medium":
        return styles.medium;

      case "Low":
        return styles.low;

      default:
        return {};
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.heading}>
          🔍 Issue Details
        </h2>

        <div style={styles.card}>

          <div style={styles.row}>
            <span style={styles.label}>
              Issue ID
            </span>

            <span style={styles.value}>
              #{issue.id}
            </span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>
              Title
            </span>

            <span style={styles.value}>
              {issue.title}
            </span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>
              Description
            </span>

            <span style={styles.value}>
              {decryptedDescription}
            </span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>
              Category
            </span>

            <span style={styles.value}>
              {issue.category}
            </span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>
              Priority
            </span>

            <span
              style={{
                ...styles.badge,
                ...getPriorityStyle(issue.priority),
              }}
            >
              {issue.priority}
            </span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>
              Status
            </span>

            <span
              style={{
                ...styles.badge,
                ...getStatusStyle(issue.status),
              }}
            >
              {issue.status}
            </span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>
              Location
            </span>

            <span style={styles.value}>
              {issue.location}
            </span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>
              Reported By
            </span>

            <span style={styles.value}>
              {issue.reportedBy}
            </span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>
              Email
            </span>

            <span style={styles.value}>
              {issue.reportedByEmail}
            </span>
          </div>

        </div>

        <Link
          to="/student/issues"
          style={styles.backBtn}
        >
          ← Back to My Issues
        </Link>

      </div>
    </Layout>
  );
}

const styles = {
  container: {
    padding: "20px",
  },

  heading: {
    marginBottom: "20px",
    color: "#111827",
  },

  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "25px",
    maxWidth: "700px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 0",
    borderBottom: "1px solid #eee",
    gap: "20px",
  },

  label: {
    fontWeight: "bold",
    color: "#374151",
    minWidth: "140px",
  },

  value: {
    flex: 1,
    textAlign: "right",
    color: "#111827",
    wordBreak: "break-word",
  },

  badge: {
    padding: "7px 14px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "13px",
  },

  pending: {
    background: "#FEF3C7",
    color: "#92400E",
  },

  inProgress: {
    background: "#DBEAFE",
    color: "#1D4ED8",
  },

  resolved: {
    background: "#D1FAE5",
    color: "#065F46",
  },

  high: {
    background: "#FEE2E2",
    color: "#B91C1C",
  },

  medium: {
    background: "#FEF3C7",
    color: "#B45309",
  },

  low: {
    background: "#DCFCE7",
    color: "#166534",
  },

  backBtn: {
    display: "inline-block",
    marginTop: "25px",
    padding: "12px 20px",
    background: "#4F46E5",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
  },

  notFound: {
    padding: "50px",
    textAlign: "center",
  },
};