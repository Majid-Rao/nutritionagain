import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ViewPackages = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/getpackages`);
      setPackages(response.data);
      setFilteredPackages(response.data);
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = packages.filter(
      (pkg) =>
        pkg.name.toLowerCase().includes(term) ||
        pkg.description.toLowerCase().includes(term)
    );
    setFilteredPackages(filtered);
  };

  const deletePackage = async (packageId) => {
    await axios
      .delete(`${import.meta.env.VITE_BACKEND_API}/api/deletepackage/${packageId}`)
      .then((response) => {
        setPackages((prevPackages) => {
          const updatedPackages = prevPackages.filter((pkg) => pkg._id !== packageId);
          setFilteredPackages(updatedPackages); // Sync the filtered list
          return updatedPackages;
        });
        toast.success(
          <div>
            <strong>Data Deleted!</strong> {response.data.message}
          </div>,
          { position: "top-center" }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
        {/* BG */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
        <Sidebar />
        <div className="flex-1 overflow-auto relative z-10">
          <Header title="Packages" />
          <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
            <motion.div
              className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="sm:text-xl text-sm font-semibold text-gray-100">Packages List</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search Package..."
                    className="bg-gray-700 text-white placeholder-gray-400 rounded-lg sm:pl-10 sm:pr-4 sm:py-2 pl-6 pr-0 py-1 ml-4 sm:ml-0 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleSearch}
                    value={searchTerm}
                  />
                  <Search className="absolute left-5 top-1 sm:left-3 sm:top-2.5 text-gray-400" size={18} />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        S.No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Variation Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-700">
                    {filteredPackages.map((pkg, index) => (
                      <motion.tr key={pkg._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-small text-gray-100">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                          {pkg.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {pkg.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {pkg.price}
                        </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {pkg.variation ? pkg.variation.name : (
                            <span>No variation</span>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                          {pkg.image ? (
                            <img
                              src={`${import.meta.env.VITE_BACKEND_API}/uploads/${pkg.image}`}
                              alt="Package Image"
                              className="w-24 h-18 object-cover"
                            />
                          ) : (
                            <span>No image</span>
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex space-x-2">
                          <Link
                            onClick={() => deletePackage(pkg._id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={18} />
                          </Link>
                          <Link
                            to={`/updatepackages/` + pkg._id}
                            className="text-indigo-400 hover:text-indigo-300 mr-2"
                          >
                            <Edit size={18} />
                          </Link>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ViewPackages;
