// src/components/Driver.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Driver = () => {
  const { id } = useParams(); // get driver ID from route param
  const { token } = useAuth();

  const [driver, setDriver] = useState(null);
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/drivers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch driver");

        const data = await res.json();

        setDriver({
          id: data.data.id,
          email: data.data.attributes.email,
        });

        const relatedPackages = data.included?.filter(
          (item) => item.type === "package"
        );

        setPackages(relatedPackages || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDriver();
  }, [id, token]);

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!driver) return <p>Loading driver details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Driver Details</h1>
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <p>
          <strong>ID:</strong> {driver.id}
        </p>
        <p>
          <strong>Email:</strong> {driver.email}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-3">Associated Packages</h2>
      {packages.length === 0 ? (
        <p>No packages assigned to this driver.</p>
      ) : (
        <ul className="space-y-4">
          {packages.map((pkg) => (
            <li
              key={pkg.id}
              className="p-4 border border-gray-300 rounded bg-white shadow"
            >
              <p>
                <strong>Reference:</strong> {pkg.attributes.reference_number}
              </p>
              <p>
                <strong>From:</strong> {pkg.attributes.location}
              </p>
              <p>
                <strong>To:</strong> {pkg.attributes.destination}
              </p>
              <p>
                <strong>Date:</strong> {pkg.attributes.date}
              </p>
              <p>
                <strong>Timeslot:</strong> {pkg.attributes.timeslot}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Driver;
