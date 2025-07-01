// src/components/CreatePackage.js
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const CreatePackage = () => {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    reference_number: "",
    location: "",
    destination: "",
    date: "",
    timeslot: "",
  });

  const [status, setStatus] = useState({ success: null, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: null, message: "" });

    try {
      const response = await fetch("http://localhost:3000/api/v1/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ package: formData }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ success: true, message: "Package created successfully!" });
        setFormData({
          reference_number: "",
          location: "",
          destination: "",
          date: "",
          timeslot: "",
        });
      } else {
        setStatus({
          success: false,
          message: data.error || "Creation failed.",
        });
      }
    } catch (err) {
      setStatus({
        success: false,
        message: "Network error. Please try again.",
      });
    }
  };

  return (
    <div style={{ padding: "16px", maxWidth: "500px" }}>
      <h2>Create New Package</h2>
      {status.message && (
        <p style={{ color: status.success ? "green" : "red" }}>
          {status.message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Reference Number</label>
          <input
            type="text"
            name="reference_number"
            value={formData.reference_number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Destination</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Timeslot</label>
          <input
            type="time"
            name="timeslot"
            value={formData.timeslot}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "16px" }}>
          Create Package
        </button>
      </form>
    </div>
  );
};

export default CreatePackage;
