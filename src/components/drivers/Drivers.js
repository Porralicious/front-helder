import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Drivers = () => {
  const { token } = useAuth();
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = `${process.env.REACT_APP_API_URL}/api/v1/drivers`;

  const handleClick = () => {
    navigate("/drivers/${}");
  };

  const currentItems = drivers;

  useEffect(() => {
    const fetchDrivers = async () => {
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
        setDrivers(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDrivers();
    }
  }, [token]);

  if (loading) return <p>Loading packages...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Drivers</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 shadow rounded-xl">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((driver) => (
                <tr key={driver.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">{driver.id}</td>
                  <td className="px-4 py-2 text-sm">
                    {driver.attributes.email}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      to={`/drivers/${driver.id}`}
                    >
                      View Driver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <div>
        <Button onClick={handleClick} variant="success" size="small">
          Create Driver
        </Button>
      </div> */}
    </div>
  );
};

export default Drivers;
