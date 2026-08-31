import Layout from "../../components/Layout";
import { useUsers } from "../../context/UserContext";
import { useState } from "react";
export default function Users() {
  const { users, toggleStatus, deleteUser } = useUsers();
  const [search, setSearch] = useState("");
  // Show only students

  const handleToggleStatus = (id) => {
    if (
      window.confirm(
        "Are you sure you want to change this user's status?"
      )
    ) {
      toggleStatus(id);
    }
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user?"
      )
    ) {
      deleteUser(id);
    }
  };

  const styles = {
    container: {
      padding: "20px",
    },

    title: {
      marginBottom: "8px",
    },

    subtitle: {
      color: "#6b7280",
      marginBottom: "20px",
    },

    table: {
      background: "#fff",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    },

    row: {
      display: "grid",
      gridTemplateColumns: "1.5fr 2fr 1fr 1fr 1.5fr",
      alignItems: "center",
      gap: "10px",
      padding: "15px",
      borderBottom: "1px solid #eee",
    },

    header: {
      background: "#f3f4f6",
      fontWeight: "bold",
    },

    badge: {
      padding: "6px 12px",
      borderRadius: "20px",
      fontWeight: "bold",
      display: "inline-block",
      textAlign: "center",
    },

    active: {
      background: "#dcfce7",
      color: "#15803d",
    },

    blocked: {
      background: "#fee2e2",
      color: "#dc2626",
    },

    role: {
      color: "#2563eb",
      fontWeight: "bold",
      textTransform: "capitalize",
    },

    actionBox: {
      display: "flex",
      gap: "10px",
    },

    blockBtn: {
      background: "#4f46e5",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      padding: "8px 12px",
      cursor: "pointer",
      fontWeight: "bold",
    },

    deleteBtn: {
      background: "#ef4444",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      padding: "8px 12px",
      cursor: "pointer",
      fontWeight: "bold",
    },

    empty: {
      padding: "30px",
      textAlign: "center",
      color: "#6b7280",
      fontWeight: "500",
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
  };
  const filteredUsers = users.filter(
  (user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
);
  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.title}>👥 Users Management</h2>

        <p style={styles.subtitle}>
          Manage registered student accounts.
        </p>
        <div style={styles.searchBox}>
  <input
    type="text"
    placeholder="🔍 Search by name or email..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={styles.searchInput}
  />
</div>
        <div style={styles.table}>
          <div style={{ ...styles.row, ...styles.header }}>
            <div>Name</div>
            <div>Email</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} style={styles.row}>
                <div>{user.name}</div>

                <div>{user.email}</div>

              

                <div>
                  <span
                    style={{
                      ...styles.badge,
                      ...(user.status === "Active"
                        ? styles.active
                        : styles.blocked),
                    }}
                  >
                    {user.status}
                  </span>
                </div>

                <div style={styles.actionBox}>
                  <button
                    style={styles.blockBtn}
                    onClick={() => handleToggleStatus(user.id)}
                  >
                    {user.status === "Active"
                      ? "Block"
                      : "Unblock"}
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.empty}>
              No registered users found.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}