import React, { useState, useEffect } from "react";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateOrder = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [packageName, setPackageName] = useState("");
  const [variationOption, setVariationOption] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [customerAge, setCustomerAge] = useState("");
  const [customerWeight, setCustomerWeight] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [pastPatientHistory, setPastPatientHistory] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the current order details
  useEffect(() => {
  const fetchOrderData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/oneorder/${id}`);
      const order = response.data;

      setCustomerName(order.customer.name || '');
      setCustomerEmail(order.customer.email || '');
      setCustomerAge(order.customer.age || '');
      setCustomerWeight(order.customer.weight || '');
      setCustomerPhone(order.customer.phone || '');
      setCustomerAddress(order.customer.address || '');
      setPastPatientHistory(order.customer.pastPatientHistory || '');
      setPackageName(order.packages.map(pkg => pkg.package.name).join(", "));
      setVariationOption(order.packages.map(pkg => 
        pkg.selectedOption?.name || pkg.selectedOptionName || 'No variation'
      ).join(", "));
      setPrice(order.packages.map(pkg => pkg.price).join(", "));
      setStatus(order.status || 'pending');
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Error fetching order details!");
    }
  };

  fetchOrderData();
}, [id]);

  // Handle form submission for updating the order
// Update the handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const updatedOrder = {
      customerName,
      customerEmail,
      customerAge: Number(customerAge),
      customerWeight: Number(customerWeight),
      customerPhone,
      customerAddress,
      pastPatientHistory,
      status: status.toLowerCase() // Ensure status is lowercase
    };

    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_API}/api/updateorder/${id}`,
      updatedOrder
    );

    if (response.status === 200) {
      toast.success("Order updated successfully!");
      navigate("/orders");
    }
  } catch (error) {
    console.error("Error updating order:", error);
    toast.error(error.response?.data?.message || "Error updating order");
  }
};

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'completed', label: 'Completed' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'cancelled', label: 'Cancelled' }
];


  return (
    <>
      <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
        <Sidebar />
        <div className="flex-1 overflow-auto relative z-10">
          <Header title="Update Order" />
          <main className="max-w-5xl mx-auto py-4 px-2 sm:px-4 lg:px-8">
            <div className="max-w-md mx-auto p-4 sm:p-6 bg-black text-white rounded-lg shadow-lg">
              <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-500 mb-6">
                Update Order
              </h1>
              <form onSubmit={handleSubmit} className="space-y-1">
                {/* Customer Name Field */}
                <div>
                  <label htmlFor="customerName" className="block text-md sm:text-lg font-medium">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Customer Email Field */}
                <div>
                  <label htmlFor="customerEmail" className="block text-md sm:text-lg font-medium">
                    Customer Email
                  </label>
                  <input
                    type="email"
                    id="customerEmail"
                    name="customerEmail"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Customer Age Field */}
                <div>
                  <label htmlFor="customerAge" className="block text-md sm:text-lg font-medium">
                    Customer Age
                  </label>
                  <input
                    type="number"
                    id="customerAge"
                    name="customerAge"
                    value={customerAge}
                    onChange={(e) => setCustomerAge(e.target.value)}
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Customer Weight Field */}
                <div>
                  <label htmlFor="customerWeight" className="block text-md sm:text-lg font-medium">
                    Customer Weight
                  </label>
                  <input
                    type="number"
                    id="customerWeight"
                    name="customerWeight"
                    value={customerWeight}
                    onChange={(e) => setCustomerWeight(e.target.value)}
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Customer Phone Field */}
                <div>
                  <label htmlFor="customerPhone" className="block text-md sm:text-lg font-medium">
                    Customer Phone
                  </label>
                  <input
                    type="text"
                    id="customerPhone"
                    name="customerPhone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Customer Address Field */}
                <div>
                  <label htmlFor="customerAddress" className="block text-md sm:text-lg font-medium">
                    Customer Address
                  </label>
                  <input
                    type="text"
                    id="customerAddress"
                    name="customerAddress"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Past Patient History Field */}
                <div>
                  <label htmlFor="pastPatientHistory" className="block text-md sm:text-lg font-medium">
                    Past Patient History
                  </label>
                  <input
                    type="text"
                    id="pastPatientHistory"
                    name="pastPatientHistory"
                    value={pastPatientHistory}
                    onChange={(e) => setPastPatientHistory(e.target.value)}
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Package Name Field */}
                <div>
                  <label htmlFor="packageName" className="block text-md sm:text-lg font-medium">
                    Package Name
                  </label>
                  <input
                    type="text"
                    id="packageName"
                    name="packageName"
                    value={packageName}
                    readOnly
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Variation Option Field */}
                <div>
                  <label htmlFor="variationOption" className="block text-md sm:text-lg font-medium">
                    Variation Option
                  </label>
                  <input
                    type="text"
                    id="variationOption"
                    name="variationOption"
                    value={variationOption}
                    readOnly
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Price Field */}
                <div>
                  <label htmlFor="price" className="block text-md sm:text-lg font-medium">
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={price}
                    readOnly
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Status Field */}
                <div>
                  <label htmlFor="status" className="block text-md sm:text-lg font-medium">
                    Status
                  </label>
                 <select
  id="status"
  name="status"
  value={status.toLowerCase()}
  onChange={(e) => setStatus(e.target.value)}
  className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
>
  {statusOptions.map(option => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
</select>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-4 py-2 mt-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UpdateOrder;
