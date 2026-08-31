import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  const features = [
    {
      icon: "📢",
      title: "Instant Reporting",
      desc: "Report campus issues quickly with a simple form.",
    },
    {
      icon: "📊",
      title: "Track Progress",
      desc: "Monitor issue status from Pending to Resolved.",
    },
    {
      icon: "🛠",
      title: "Admin Dashboard",
      desc: "Admins can manage, assign and resolve issues.",
    },
    {
      icon: "🔔",
      title: "Real-Time Updates",
      desc: "Stay informed with instant status updates.",
    },
  ];

  return (
    <div style={styles.container}>
      {/* HERO */}
      <motion.section
        style={styles.hero}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 style={styles.heading}>
          🏫 Smart Campus Issue Reporting & Resolution System
        </h1>

        <p style={styles.description}>
          Report, monitor and resolve campus issues efficiently through a
          modern digital platform.
        </p>

        <div style={styles.buttonGroup}>
          <Link to="/login" style={styles.primaryBtn}>
            Login
          </Link>

          <Link to="/register" style={styles.secondaryBtn}>
            Register
          </Link>
        </div>
      </motion.section>

      {/* FEATURES */}
      <section style={styles.section}>
        <h2>✨ Key Features</h2>

        <div style={styles.grid}>
          {features.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              style={styles.card}
            >
              <div style={styles.icon}>{item.icon}</div>

              <h3>{item.title}</h3>

              <p style={styles.cardText}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={styles.statsSection}>
        <div style={styles.statCard}>
          <h2>500+</h2>
          <p>Issues Reported</p>
        </div>

        <div style={styles.statCard}>
          <h2>95%</h2>
          <p>Resolution Rate</p>
        </div>

        <div style={styles.statCard}>
          <h2>24/7</h2>
          <p>Availability</p>
        </div>

        <div style={styles.statCard}>
          <h2>1000+</h2>
          <p>Students Supported</p>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <h2>Ready to Improve Your Campus?</h2>

        <p>
          Join Smart Campus and help build a better learning environment.
        </p>

        <Link to="/register" style={styles.primaryBtn}>
          Get Started
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        © 2026 Smart Campus Issue Reporting & Resolution System
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    background: "#f9fafb",
    color: "#111827",
  },

  hero: {
    padding: "100px 20px",
    textAlign: "center",
    background: "linear-gradient(135deg,#4f46e5,#9333ea)",
    color: "white",
  },

  heading: {
    fontSize: "42px",
    marginBottom: "20px",
  },

  description: {
    maxWidth: "700px",
    margin: "auto",
    fontSize: "18px",
    lineHeight: "1.6",
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "35px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    background: "white",
    color: "#4f46e5",
    textDecoration: "none",
    padding: "14px 28px",
    borderRadius: "10px",
    fontWeight: "bold",
  },

  secondaryBtn: {
    border: "2px solid white",
    color: "white",
    textDecoration: "none",
    padding: "14px 28px",
    borderRadius: "10px",
    fontWeight: "bold",
  },

  section: {
    padding: "70px 30px",
    textAlign: "center",
  },

  grid: {
    marginTop: "35px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: "25px",
  },

  card: {
    background: "white",
    borderRadius: "15px",
    padding: "30px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
  },

  icon: {
    fontSize: "40px",
    marginBottom: "15px",
  },

  cardText: {
    color: "#6b7280",
    lineHeight: "1.6",
  },

  statsSection: {
    padding: "60px 20px",
    background: "#eef2ff",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: "20px",
  },

  statCard: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  cta: {
    padding: "80px 20px",
    textAlign: "center",
  },

  footer: {
    padding: "20px",
    background: "#111827",
    color: "white",
    textAlign: "center",
    marginTop: "40px",
  },
};