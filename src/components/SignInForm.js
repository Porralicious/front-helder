// src/components/LoginForm.js
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "./common/Button";
import Input from "./common/Input";
import ErrorMessage from "./common/ErrorMessage";

const SignInForm = () => {
  const [email, setEmail] = useState("a@gmail.com");
  const [password, setPassword] = useState("etapath");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setIsLoading(true);

    const result = await signIn(email, password);
    if (!result.success) {
      setError(result.message);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f9fafb",
      padding: "48px 16px",
    },
    formContainer: {
      maxWidth: "400px",
      width: "100%",
      backgroundColor: "white",
      padding: "32px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
    title: {
      textAlign: "center",
      fontSize: "24px",
      fontWeight: "bold",
      color: "#111827",
      marginBottom: "24px",
    },
    inputGroup: {
      marginBottom: "16px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Sign in to your account</h2>

        <div style={styles.inputGroup}>
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            required
          />
        </div>

        <ErrorMessage message={error} />

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          loading={isLoading}
          fullWidth
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </div>
    </div>
  );
};

export default SignInForm;
