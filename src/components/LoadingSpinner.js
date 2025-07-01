// src/components/LoadingSpinner.js
import React, { useEffect } from "react";

const LoadingSpinner = ({ message = "Loading..." }) => {
  useEffect(() => {
    // Add keyframes for spinner animation if not already added
    const existingStyle = document.getElementById("spinner-keyframes");
    if (!existingStyle) {
      const spinnerStyle = document.createElement("style");
      spinnerStyle.id = "spinner-keyframes";
      spinnerStyle.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(spinnerStyle);
    }
  }, []);

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f9fafb",
    },
    content: {
      textAlign: "center",
    },
    spinner: {
      width: "32px",
      height: "32px",
      border: "3px solid #f3f3f3",
      borderTop: "3px solid #4f46e5",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      margin: "0 auto 16px",
    },
    text: {
      color: "#6b7280",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.spinner}></div>
        <p style={styles.text}>{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
