// src/components/common/Button.js
import React from "react";

const Button = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  type = "button",
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: disabled ? "#9ca3af" : "#4f46e5",
          color: "white",
          border: "none",
        };
      case "danger":
        return {
          backgroundColor: disabled ? "#9ca3af" : "#dc2626",
          color: "white",
          border: "none",
        };
      case "secondary":
        return {
          backgroundColor: disabled ? "#f3f4f6" : "#f9fafb",
          color: disabled ? "#9ca3af" : "#374151",
          border: `1px solid ${disabled ? "#d1d5db" : "#d1d5db"}`,
        };
      default:
        return {
          backgroundColor: disabled ? "#9ca3af" : "#4f46e5",
          color: "white",
          border: "none",
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          padding: "6px 12px",
          fontSize: "12px",
        };
      case "medium":
        return {
          padding: "8px 16px",
          fontSize: "14px",
        };
      case "large":
        return {
          padding: "12px 24px",
          fontSize: "16px",
        };
      default:
        return {
          padding: "8px 16px",
          fontSize: "14px",
        };
    }
  };

  const baseStyles = {
    borderRadius: "6px",
    fontWeight: "500",
    cursor: disabled || loading ? "not-allowed" : "pointer",
    transition: "all 0.2s ease-in-out",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    outline: "none",
    width: fullWidth ? "100%" : "auto",
    opacity: disabled || loading ? 0.6 : 1,
    ...getSizeStyles(),
    ...getVariantStyles(),
  };

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      style={baseStyles}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div
          style={{
            width: "14px",
            height: "14px",
            border: "2px solid transparent",
            borderTop: "2px solid currentColor",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      )}
      {children}
    </button>
  );
};

export default Button;
