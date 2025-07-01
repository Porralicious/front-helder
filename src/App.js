import React from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
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
      <AppContent />
    </AuthProvider>
  );
};

export default App;
