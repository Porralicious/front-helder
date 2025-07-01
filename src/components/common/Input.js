// src/components/common/Input.js
import React from "react";

const Input = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  onKeyPress,
  disabled = false,
  required = false,
  error = false,
  label,
  ...props
}) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#374151",
    },
    input: {
      width: "100%",
      padding: "12px",
      border: `1px solid ${error ? "#dc2626" : "#d1d5db"}`,
      borderRadius: "6px",
      fontSize: "14px",
      boxSizing: "border-box",
      backgroundColor: disabled ? "#f9fafb" : "white",
      color: disabled ? "#9ca3af" : "#111827",
      outline: "none",
      transition: "border-color 0.2s ease-in-out",
    },
    inputFocus: {
      borderColor: error ? "#dc2626" : "#4f46e5",
      boxShadow: `0 0 0 3px ${
        error ? "rgba(220, 38, 38, 0.1)" : "rgba(79, 70, 229, 0.1)"
      }`,
    },
  };

  const [isFocused, setIsFocused] = React.useState(false);

  const inputStyle = {
    ...styles.input,
    ...(isFocused ? styles.inputFocus : {}),
  };

  return (
    <div style={styles.container}>
      {label && <label style={styles.label}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        required={required}
        style={inputStyle}
        {...props}
      />
    </div>
  );
};

export default Input;
