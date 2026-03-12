import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all orders from the API
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/allorders`);
      setOrders(response.data);
      setFilteredOrders(response.data);
    };
    fetchData();
  }, []);

  // Search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = orders.filter(
      (order) =>
        order.customer.name.toLowerCase().includes(term) ||
        order.customer.email.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
  };

  // Delete order
  const deleteOrder = async (orderId) => {
    await axios
      .delete(`${import.meta.env.VITE_BACKEND_API}/api/deleteorders/${orderId}`)
      .then((response) => {
        setOrders((prevOrders) => {
          const updatedOrders = prevOrders.filter((order) => order._id !== orderId);
          setFilteredOrders(updatedOrders); // Sync the filtered list
          return updatedOrders;
        });
        toast.success(
          <div>
            <strong>Order Deleted!</strong> {response.data.message}
          </div>,
          { position: "top-center" }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* BG */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
      <Sidebar />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Orders" />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="sm:text-xl text-sm font-semibold text-gray-100">Orders List</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Orders..."
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg sm:pl-10 sm:pr-4 sm:py-2 pl-6 pr-0 py-1 ml-4 sm:ml-0 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleSearch}
                  value={searchTerm}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">S.No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Weight</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Patient History</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Package Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Variation Option</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-700">
                  {filteredOrders.map((order, index) => (
                    <motion.tr key={order._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-small text-gray-100">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{order.customer.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{order.customer.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{order.customer.weight}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.customer.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.customer.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.customer.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.customer.pastPatientHistory}</td>

                      {/* Package and Variation Data */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {order.packages.map((pkg) => pkg.package.name).join(", ")}
                      </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {order.packages.map((pkg, idx) => (
                  <div key={idx}>
                  {pkg.selectedOptionName}
                  </div>
                  ))}
                  </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {order.packages.map((pkg) => pkg.price).join(", ")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex space-x-2">
                        <Link onClick={() => deleteOrder(order._id)} className="text-red-400 hover:text-red-300">
                          <Trash2 size={18} />
                        </Link>
                        <Link to={`/updateorder/${order._id}`} className="text-indigo-400 hover:text-indigo-300 mr-2">
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
  );
};

export default Orders;
