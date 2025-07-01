// src/components/Dashboard.js
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import UserInfo from "./UserInfo";
import Packages from "./Packages";

const Dashboard = () => {
  const { user } = useAuth();

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
    },
    main: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "24px 16px",
    },
    content: {
      border: "4px dashed #d1d5db",
      borderRadius: "8px",
      height: "400px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    contentInner: {
      textAlign: "center",
    },
    contentTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#111827",
      marginBottom: "16px",
    },
    contentSubtitle: {
      color: "#6b7280",
      marginBottom: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />

      <main style={styles.main}>
        <div style={styles.content}>
          <div style={styles.contentInner}>
            <h2 style={styles.contentTitle}>Packages</h2>
            <Packages />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
