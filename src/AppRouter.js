import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreatePackage from "./components/packages/CreatePackage";
import SignInForm from "./components/SignInForm";
import { useAuth } from "./contexts/AuthContext";
import LoadingSpinner from "./components/LoadingSpinner";
const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner message="Initializing application..." />;
  }

  // If authenticated, redirect to dashboard
  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <SignInForm />
  );
};

const AppRouter = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/packages/new"
          element={
            isAuthenticated ? <CreatePackage /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
