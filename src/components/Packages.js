// src/components/Packages.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Packages = () => {
  const { token } = useAuth();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:3000/api/v1/packages";

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }

        const data = await response.json();
        setPackages(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPackages();
    }
  }, [token]);

  if (loading) return <p>Loading packages...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "16px" }}>
      {packages.length === 0 ? (
        <p>No packages available.</p>
      ) : (
        <ul>
          {packages.map((pkg) => (
            <li key={pkg.id} style={{ marginBottom: "12px" }}>
              <strong>Ref:</strong> {pkg.reference_number} <br />
              <strong>From:</strong> {pkg.location} <br />
              <strong>To:</strong> {pkg.destination} <br />
              <strong>Date:</strong> {pkg.date} <br />
              <strong>Timeslot:</strong> {pkg.timeslot}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Packages;
