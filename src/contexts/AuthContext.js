// src/contexts/AuthContext.js
import React, { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

  useEffect(() => {
    if (token) {
      // fetchCurrentUser();
      setUser(localStorage.getItem("user"));
      if (user) {
        setLoading(false);
      } else {
        signOut();
      }
    } else {
      setLoading(false);
    }
  }, [token]);

  const signIn = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/sign_in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email,
            password,
          },
        }),
      });

      const data = await response.json();

      if (data.status == 200) {
        const authToken = response.headers.get("Authorization");
        if (authToken) {
          const cleanToken = authToken.replace("Bearer ", "");
          localStorage.setItem("token", cleanToken);
          localStorage.setItem("user", data.data.email);
          setToken(cleanToken);
          setUser(data.data.email);
          return { success: true, user: data.data };
        }
      } else {
        return { success: false, message: data.data.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Network error occurred" };
    }
  };

  const signOut = async () => {
    try {
      if (token) {
        await fetch(`${API_BASE_URL}/users/sign_out`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    }
  };

  const value = {
    user,
    signIn,
    signOut,
    loading,
    isAuthenticated: !!user,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
