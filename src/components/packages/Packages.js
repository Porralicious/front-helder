// src/components/Packages.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import EditPackageModal from "./EditPackageModal";
const Packages = () => {
  const { token } = useAuth();
  const [packages, setPackages] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [packageToEdit, setPackageToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const API_URL = `${process.env.REACT_APP_API_URL}/api/v1/packages`;

  const handleClick = () => {
    navigate("/packages/new");
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const date = new Date(timeString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredPackages = packages.filter((pkg) => {
    if (startDate && pkg.date < startDate) return false;
    if (endDate && pkg.date > endDate) return false;
    return true;
  });
  const currentItems = filteredPackages.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (pkg) => {
    setPackageToEdit(pkg);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?"))
      return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/packages/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
      } else {
        console.error("Failed to delete package");
      }
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  const handleSave = async (updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${updatedData.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ package: updatedData }),
      });

      if (response.ok) {
        const updated = await response.json();
        setPackages((prev) =>
          prev.map((p) => (p.id === updated.data.id ? updated.data : p))
        );
        setEditModalOpen(false);
      } else {
        console.error("Failed to update package");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

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

    const fetchDrivers = async () => {
      const res = await fetch("http://localhost:3000/api/v1/drivers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const parsed = data.data.map((driver) => ({
        id: driver.id,
        email: driver.attributes.email,
      }));
      setDrivers(parsed);
    };

    if (token) {
      fetchPackages();
      fetchDrivers();
    }
  }, [token]);

  if (loading) return <p>Loading packages...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Packages</h2>

        <div className="overflow-x-auto">
          <div className="mb-4 flex items-center flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="self-end">
              <button
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  setCurrentPage(1);
                }}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded text-sm"
              >
                Clear Filters
              </button>
            </div>
          </div>
          <table className="min-w-full table-auto border border-gray-200 shadow rounded-xl">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Ref #
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Location
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Destination
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Timeslot
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((pkg) => (
                <tr key={pkg.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">{pkg.reference_number}</td>
                  <td className="px-4 py-2 text-sm">{pkg.location}</td>
                  <td className="px-4 py-2 text-sm">{pkg.destination}</td>
                  <td className="px-4 py-2 text-sm">{pkg.date}</td>
                  <td className="px-4 py-2 text-sm">
                    {formatTime(pkg.timeslot)}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 text-sm rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pkg.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => handlePageChange(idx + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Button onClick={handleClick} variant="success" size="small">
          Create Package
        </Button>
      </div>
      <EditPackageModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSave}
        packageData={packageToEdit}
        drivers={drivers}
      />
    </div>
  );
};

export default Packages;
