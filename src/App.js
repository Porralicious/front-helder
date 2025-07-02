import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AppRouter from "./AppRouter";
import SignInForm from "./components/SignInForm";
import Dashboard from "./components/Dashboard";
import LoadingSpinner from "./components/LoadingSpinner";

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Initializing application..." />;
  }

  return isAuthenticated ? <Dashboard /> : <SignInForm />;
};

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
