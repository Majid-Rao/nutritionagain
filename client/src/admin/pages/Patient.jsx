import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import { motion } from "framer-motion";
import { Edit, Trash2, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const CustomerDetails = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);

  // Fetch all customers from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}api/getcustomers`);
        setCustomers(response.data);
        setFilteredCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast.error("Failed to fetch customers");
      }
    };
    fetchData();
  }, []);

  // Search functionality
 // Update the handleSearch function
const handleSearch = (e) => {
  const term = e.target.value.toLowerCase();
  setSearchTerm(term);

  const filtered = customers.filter((customer) => {
    // Helper function to safely check string includes
    const safeIncludes = (value) => {
      return String(value || '').toLowerCase().includes(term);
    };
   const customerId = generateSimpleId(customer._id);
    // Check all relevant fields
    return (
      safeIncludes(customerId) ||
      safeIncludes(customer.fullName) ||
      safeIncludes(customer.email) ||
      safeIncludes(customer.contactNumber) ||
      safeIncludes(customer.location) ||
      safeIncludes(customer.mainConcern) ||
      safeIncludes(customer.gender) ||
      safeIncludes(customer.age) ||
      safeIncludes(customer.status) ||
      
      // Include medical conditions
      safeIncludes(customer.medicalHistory?.associatedConditions) ||
      safeIncludes(customer.medicalHistory?.pastIssues) ||
      // Include fertility history conditions
      (customer.femaleFertilityHistory?.marriedFemales?.historyOfConditions || [])
        .some(condition => safeIncludes(condition)) ||
      (customer.femaleFertilityHistory?.unmarriedFemales?.historyOfConditions || [])
        .some(condition => safeIncludes(condition)) ||
      (customer.maleFertilityHistory?.historyOfConditions || [])
        .some(condition => safeIncludes(condition))
    );
  });

  setFilteredCustomers(filtered);
};

  // Delete customer
  const deleteCustomer = async (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_API}api/deletecustomer/${customerId}`);
        setCustomers((prevCustomers) => {
          const updatedCustomers = prevCustomers.filter((customer) => customer._id !== customerId);
          setFilteredCustomers(updatedCustomers);
          return updatedCustomers;
        });
        toast.success("Customer deleted successfully!", { position: "top-center" });
      } catch (error) {
        console.error("Error deleting customer:", error);
        toast.error("Failed to delete customer");
      }
    }
  };

  // Generate simple ID for display
const generateSimpleId = (mongoId) => {
  if (!mongoId) return '';
  return `user-${mongoId.toString().slice(-5)}`;
};

  // Format date
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString();
  };

  // Format array data
  const formatArray = (array) => {
    if (!array || array.length === 0) return "-";
    return array.join(", ");
  };

  // Format boolean
  const formatBoolean = (value) => {
    return value ? "Yes" : "No";
  };

  // Toggle expanded row
  const toggleExpandedRow = (customerId) => {
    setExpandedRow(expandedRow === customerId ? null : customerId);
  };

  const CustomerDetailRow = ({ customer }) => {
    const isExpanded = expandedRow === customer._id;
    
    return (
      <>
        <motion.tr
          key={customer._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="hover:bg-gray-700/50 cursor-pointer"
          onClick={() => toggleExpandedRow(customer._id)}
        >
          <td className="px-4 py-3 text-sm text-gray-100">{generateSimpleId(customer._id)}</td>
          <td className="px-4 py-3 text-sm text-gray-100">{customer.fullName}</td>
          <td className="px-4 py-3 text-sm text-gray-300">{customer.gender}</td>
          <td className="px-4 py-3 text-sm text-gray-300">{customer.age}</td>
          <td className="px-4 py-3 text-sm text-gray-300">{customer.email}</td>
          <td className="px-4 py-3 text-sm text-gray-300">{customer.contactNumber}</td>
          <td className="px-4 py-3 text-sm text-gray-300">{customer.status || "pending"}</td>
          <td className="px-7 py-3 text-sm text-gray-300">{customer.price || "0"}</td>

          <td className="px-4 py-3 text-sm text-gray-300">
            <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => toggleExpandedRow(customer._id)}
                className="text-blue-400 hover:text-blue-300"
                title="View Details"
              >
                <Eye size={16} />
              </button>
              <Link
                to={`/updatecustomer/${customer._id}`}
                className="text-indigo-400 hover:text-indigo-300"
                title="Edit Customer"
              >
                <Edit size={16} />
              </Link>
              <button
                onClick={() => deleteCustomer(customer._id)}
                className="text-red-400 hover:text-red-300"
                title="Delete Customer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </td>
        </motion.tr>
        
        {/* Expanded Details Row */}
        {isExpanded && (
          <motion.tr
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800/30"
          >
            <td colSpan="8" className="px-4 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                
                {/* Basic Information */}
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-400 mb-3">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-400">Weight:</span> {customer.weight} {customer.weightUnit}</p>
                    <p><span className="text-gray-400">Location:</span> {customer.location || "-"}</p>
                    <p><span className="text-gray-400">Marital Status:</span> {customer.maritalStatus || "-"}</p>
                    <p><span className="text-gray-400">Main Concern:</span> {customer.mainConcern || "-"}</p>

                    <p><span className="text-gray-400">Order Date:</span> {formatDate(customer.orderDate)}</p>
                    <p><span className="text-gray-400">Updated:</span> {formatDate(customer.updatedDate)}</p>
                  </div>
                </div>

                {/* Female Fertility History */}
                {customer.femaleFertilityHistory?.isFemale && (
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-pink-400 mb-3">Female Fertility History</h4>
                    
                    {customer.femaleFertilityHistory.marriedFemales && (
                      <div className="mb-4">
                        <h5 className="font-medium text-pink-300 mb-2">Married Details</h5>
                        <div className="space-y-2 text-sm">
                          <p><span className="text-gray-400">Trying to Conceive:</span> 
                            {customer.femaleFertilityHistory.marriedFemales.tryingToConceiveFor?.value || "-"} 
                            {customer.femaleFertilityHistory.marriedFemales.tryingToConceiveFor?.unit || ""}
                          </p>
                          <p><span className="text-gray-400">Cycle Length:</span> {customer.femaleFertilityHistory.marriedFemales.menstrualCycleLength || "-"} days</p>
                          <p><span className="text-gray-400">Flow:</span> {customer.femaleFertilityHistory.marriedFemales.flow || "-"}</p>
                          <p><span className="text-gray-400">Regularity:</span> {customer.femaleFertilityHistory.marriedFemales.cycleRegularity || "-"}</p>
                          <p><span className="text-gray-400">Last Period:</span> {formatDate(customer.femaleFertilityHistory.marriedFemales.lastMenstrualPeriod)}</p>
                          <p><span className="text-gray-400">Conditions:</span> {formatArray(customer.femaleFertilityHistory.marriedFemales.historyOfConditions)}</p>
                          <p><span className="text-gray-400">Other Conditions:</span> {customer.femaleFertilityHistory.marriedFemales.otherConditions || "-"}</p>
                          <div className="mt-2">
                            <span className="text-gray-400">Pregnancy History:</span>
                            <div className="ml-2">
                              <p>• Pregnancies: {customer.femaleFertilityHistory.marriedFemales.pregnancyHistory?.pregnancies || "-"}</p>
                              <p>• Labour: {customer.femaleFertilityHistory.marriedFemales.pregnancyHistory?.labour || "-"}</p>
                              <p>• Miscarriages: {customer.femaleFertilityHistory.marriedFemales.pregnancyHistory?.miscarriage || "-"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {customer.femaleFertilityHistory.unmarriedFemales && (
                      <div>
                        <h5 className="font-medium text-pink-300 mb-2">Unmarried Details</h5>
                        <div className="space-y-2 text-sm">
                          <p><span className="text-gray-400">Cycle Length:</span> {customer.femaleFertilityHistory.unmarriedFemales.cycleLength || "-"} days</p>
                          <p><span className="text-gray-400">Flow:</span> {customer.femaleFertilityHistory.unmarriedFemales.flow || "-"}</p>
                          <p><span className="text-gray-400">Regularity:</span> {customer.femaleFertilityHistory.unmarriedFemales.cycleRegularity || "-"}</p>
                          <p><span className="text-gray-400">Last Period:</span> {formatDate(customer.femaleFertilityHistory.unmarriedFemales.lastMenstrualPeriod)}</p>
                          <p><span className="text-gray-400">Conditions:</span> {formatArray(customer.femaleFertilityHistory.unmarriedFemales.historyOfConditions)}</p>
                          <p><span className="text-gray-400">Other Conditions:</span> {customer.femaleFertilityHistory.unmarriedFemales.otherConditions || "-"}</p>
                          <p><span className="text-gray-400">Concerns:</span> {formatArray(customer.femaleFertilityHistory.unmarriedFemales.concerns)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Male Fertility History */}
                {customer.maleFertilityHistory?.isMale && (
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-blue-400 mb-3">Male Fertility History</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-400">Trying to Conceive:</span> 
                        {customer.maleFertilityHistory.tryingToConceiveFor?.value || "-"} 
                        {customer.maleFertilityHistory.tryingToConceiveFor?.unit || ""}
                      </p>
                      <p><span className="text-gray-400">Conditions:</span> {formatArray(customer.maleFertilityHistory.historyOfConditions)}</p>
                      <p><span className="text-gray-400">Other Conditions:</span> {customer.maleFertilityHistory.otherConditions || "-"}</p>
                      <p><span className="text-gray-400">Previous Semen Analysis:</span> {customer.maleFertilityHistory.previousSemenAnalysis || "-"}</p>
                      <p><span className="text-gray-400">Analysis Results:</span> {customer.maleFertilityHistory.semenAnalysisResults || "-"}</p>
                    </div>
                  </div>
                )}

                {/* Medical History */}
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-green-400 mb-3">Medical History</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-400">Associated Conditions:</span> {customer.medicalHistory?.associatedConditions || "-"}</p>
                    <p><span className="text-gray-400">Past Issues:</span> {customer.medicalHistory?.pastIssues || "-"}</p>
                    <p><span className="text-gray-400">Current Medications:</span> {customer.currentMedications || "-"}</p>
                  </div>
                </div>

                {/* Diet & Lifestyle */}
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-3">Diet & Lifestyle</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-400">Meals per Day:</span> {customer.mealsPerDay || "-"}</p>
                    <p><span className="text-gray-400">Diet Type:</span> {customer.dietType || "-"}</p>
                    <p><span className="text-gray-400">Food Intolerances:</span> {customer.foodIntolerances || "-"}</p>
                  </div>
                </div>

                {/* Family History */}
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-red-400 mb-3">Family History</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-400">Infertility:</span> {formatBoolean(customer.familyHistory?.infertility)}</p>
                    <p><span className="text-gray-400">PCOS:</span> {formatBoolean(customer.familyHistory?.pcos)}</p>
                    <p><span className="text-gray-400">Diabetes:</span> {formatBoolean(customer.familyHistory?.diabetes)}</p>
                    <p><span className="text-gray-400">Thyroid Disorders:</span> {formatBoolean(customer.familyHistory?.thyroidDisorders)}</p>
                    <p><span className="text-gray-400">Obesity:</span> {formatBoolean(customer.familyHistory?.obesity)}</p>
                    <p><span className="text-gray-400">Heart Disease:</span> {formatBoolean(customer.familyHistory?.heartDisease)}</p>
                  </div>
                </div>

              </div>
            </td>
          </motion.tr>
        )}
      </>
    );
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
      
      <Sidebar />
      
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Customer Details" />
        
        <main className="max-w-full mx-auto py-4 px-2 lg:px-4">
          <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold text-gray-100">Customer Details List</h2>
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-4 pr-4 py-2 w-full sm:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleSearch}
                  value={searchTerm}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Full Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Gender</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Age</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-700">
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <CustomerDetailRow key={customer._id} customer={customer} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-4 text-center text-gray-400">
                        No customers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {filteredCustomers.length > 0 && (
              <div className="mt-4 text-sm text-gray-400 text-center">
                Showing {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''}
                {searchTerm && ` matching "${searchTerm}"`}
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDetails;