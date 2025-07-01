// src/components/Navbar.js
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "./common/Button";

const Navbar = () => {
  const { user, signOut } = useAuth();

  const styles = {
    nav: {
      backgroundColor: "white",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      padding: "0 16px",
    },
    navContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "64px",
    },
    title: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#111827",
    },
    navRight: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    welcome: {
      color: "#374151",
      fontSize: "14px",
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.navContent}>
        <h1 style={styles.title}>Dashboard</h1>
        <div style={styles.navRight}>
          <span style={styles.welcome}>
            Welcome, {user?.first_name || user?.email}!
          </span>
          <Button onClick={signOut} variant="danger" size="small">
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
