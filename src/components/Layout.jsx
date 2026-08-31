import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div style={styles.wrapper}>
      <Sidebar />

      <div style={styles.main}>
        <Navbar />

        <div style={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    background: "#f3f4f6",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },

  content: {
    padding: "20px",
    overflowY: "auto",
    height: "calc(100vh - 60px)", // accounts for navbar height
  },
};