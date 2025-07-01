// src/components/common/ErrorMessage.js
import React from "react";

const ErrorMessage = ({ message, className = "" }) => {
  if (!message) return null;

  const styles = {
    error: {
      color: "#dc2626",
      fontSize: "14px",
      textAlign: "center",
      marginTop: "8px",
      padding: "8px",
      backgroundColor: "#fef2f2",
      border: "1px solid #fecaca",
      borderRadius: "6px",
    },
  };

  return (
    <div style={styles.error} className={className}>
      {message}
    </div>
  );
};

export default ErrorMessage;
