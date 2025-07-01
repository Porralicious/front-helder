// src/components/UserInfo.js
import React from "react";

const UserInfo = ({ user }) => {
  const styles = {
    userInfo: {
      backgroundColor: "#f3f4f6",
      padding: "16px",
      borderRadius: "8px",
      textAlign: "left",
      marginTop: "16px",
      maxWidth: "400px",
      margin: "16px auto 0",
    },
    userInfoTitle: {
      fontWeight: "600",
      marginBottom: "12px",
      fontSize: "16px",
      color: "#111827",
    },
    userInfoItem: {
      marginBottom: "8px",
      fontSize: "14px",
      color: "#374151",
    },
    label: {
      fontWeight: "600",
      color: "#111827",
    },
  };

  if (!user) {
    return null;
  }

  return (
    <div style={styles.userInfo}>
      <h3 style={styles.userInfoTitle}>User Information:</h3>
      <div style={styles.userInfoItem}>
        <span style={styles.label}>Email:</span> {user.email}
      </div>
      {user.first_name && (
        <div style={styles.userInfoItem}>
          <span style={styles.label}>First Name:</span> {user.first_name}
        </div>
      )}
      {user.last_name && (
        <div style={styles.userInfoItem}>
          <span style={styles.label}>Last Name:</span> {user.last_name}
        </div>
      )}
      <div style={styles.userInfoItem}>
        <span style={styles.label}>ID:</span> {user.id}
      </div>
      {user.created_at && (
        <div style={styles.userInfoItem}>
          <span style={styles.label}>Member Since:</span>{" "}
          {new Date(user.created_at).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default UserInfo;
