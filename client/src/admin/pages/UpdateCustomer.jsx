import React, { useState, useEffect } from "react";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateCustomer = () => {
  const [customer, setCustomer] = useState({});
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch customer data for editing
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}api/getcustomer/${id}`);
        // Check if response.data.customer exists, otherwise use response.data
        const customerData = response.data.customer || response.data;
        
        if (!customerData) {
          throw new Error('No customer data received');
        }

        // Initialize all possible nested objects to prevent undefined errors
        const initializedCustomer = {
          ...customerData,
          femaleFertilityHistory: customerData.femaleFertilityHistory || {
            isFemale: false,
            marriedFemales: {
              tryingToConceiveFor: { value: '', unit: 'months' },
              menstrualCycleLength: '',
              flow: 'Light',
              cycleRegularity: 'Regular',
              lastMenstrualPeriod: null,
              historyOfConditions: [],
              otherConditions: '',
              pregnancyHistory: { pregnancies: '', labour: '', miscarriage: '' }
            },
            unmarriedFemales: {
              cycleLength: '',
              flow: 'Light',
              cycleRegularity: 'Regular',
              lastMenstrualPeriod: null,
              historyOfConditions: [],
              otherConditions: '',
              concerns: []
            }
          },
          maleFertilityHistory: customerData.maleFertilityHistory || {
            isMale: false,
            tryingToConceiveFor: { value: '', unit: 'months' },
            historyOfConditions: [],
            otherConditions: '',
            previousSemenAnalysis: 'No',
            semenAnalysisResults: ''
          },
          medicalHistory: customerData.medicalHistory || {
            associatedConditions: '',
            pastIssues: ''
          },
          dietAndHabits: customerData.dietAndHabits || {
            dietType: 'Vegetarian',
            foodIntolerances: ''
          },
          familyHistory: customerData.familyHistory || {
            infertility: false,
            pcos: false,
            diabetes: false,
            thyroidDisorders: false,
            obesity: false,
            heartDisease: false
          }
        };

        setCustomer(initializedCustomer);
        setError(null);
      } catch (err) {
        console.error('Error fetching customer:', err);
        const errorMessage = err.response?.data?.error || err.message || "Error fetching customer details.";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    };

    if (id) {
      fetchCustomerData();
    }
  }, [id]);

  // Handle form submission to update customer
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedCustomer = { ...customer };

      const response = await axios.put(`${import.meta.env.VITE_BACKEND_API}api/updatecustomer/${id}`, updatedCustomer);

      if (response.status === 200) {
        toast.success("Customer updated successfully!");
        navigate(`/patients`);
      }
    } catch (error) {
      setError("Error updating customer details.");
      console.error(error);
      toast.error("Error updating customer details.");
    }
  };

  // Format value function to show '-' if value is missing
 const formatValue = (value) => {
  if (value === null || value === undefined || value === '') {
    return '-';
  }
  return value;
};
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Update Customer" />
        <main className="max-w-5xl mx-auto py-4 px-2 sm:px-4 lg:px-8">
          <div className="max-w-md mx-auto p-4 sm:p-6 bg-black text-white rounded-lg shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-500 mb-6">Update Customer</h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
  {/* Basic Information Section */}
  <div className="space-y-4">
    <h3 className="text-xl font-semibold text-blue-400">Basic Information</h3>
    
    {/* Existing basic fields */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-md sm:text-lg font-medium">Full Name</label>
        <input
          type="text"
          value={formatValue(customer.fullName)}
          onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
          className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-md sm:text-lg font-medium">Email</label>
        <input
          type="email"
          value={formatValue(customer.email)}
          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
          className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-md sm:text-lg font-medium">Contact Number</label>
        <input
          type="tel"
          value={formatValue(customer.contactNumber)}
          onChange={(e) => setCustomer({ ...customer, contactNumber: e.target.value })}
          className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-md sm:text-lg font-medium">Gender</label>
        <select
          value={formatValue(customer.gender)}
          onChange={(e) => setCustomer({ ...customer, gender: e.target.value })}
          className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-md sm:text-lg font-medium">Age</label>
        <input
          type="number"
          value={formatValue(customer.age)}
          onChange={(e) => setCustomer({ ...customer, age: e.target.value })}
          className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-md sm:text-lg font-medium">Weight</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            value={formatValue(customer.weight)}
            onChange={(e) => setCustomer({ ...customer, weight: e.target.value })}
            className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={formatValue(customer.weightUnit)}
            onChange={(e) => setCustomer({ ...customer, weightUnit: e.target.value })}
            className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="Kgs">Kgs</option>
            <option value="Pounds">Pounds</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-md sm:text-lg font-medium">Location</label>
        <input
          type="text"
          value={formatValue(customer.location)}
          onChange={(e) => setCustomer({ ...customer, location: e.target.value })}
          className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-md sm:text-lg font-medium">Status</label>
        <select
          value={formatValue(customer.status)}
          onChange={(e) => setCustomer({ ...customer, status: e.target.value })}
          className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div>
        <label className="block text-md sm:text-lg font-medium">Price</label>
        <input
          type="number"
          value={formatValue(customer.price)}
          onChange={(e) => setCustomer({ ...customer, price: e.target.value })}
          className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div>
      <label className="block text-md sm:text-lg font-medium">Main Concern</label>
      <textarea
        value={formatValue(customer.mainConcern)}
        onChange={(e) => setCustomer({ ...customer, mainConcern: e.target.value })}
        className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
        rows="4"
      />
    </div>
  </div>

  {/* Medical History Section */}
  <div className="space-y-4">
    <h3 className="text-xl font-semibold text-green-400">Medical History</h3>
    <div>
      <label className="block text-md sm:text-lg font-medium">Associated Conditions</label>
      <textarea
        value={formatValue(customer.medicalHistory?.associatedConditions)}
        onChange={(e) => setCustomer({
          ...customer,
          medicalHistory: { ...customer.medicalHistory, associatedConditions: e.target.value }
        })}
        className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
        rows="4"
      />
    </div>
    <div>
      <label className="block text-md sm:text-lg font-medium">Past Issues</label>
      <textarea
        value={formatValue(customer.medicalHistory?.pastIssues)}
        onChange={(e) => setCustomer({
          ...customer,
          medicalHistory: { ...customer.medicalHistory, pastIssues: e.target.value }
        })}
        className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
        rows="4"
      />
    </div>
  </div>

  {/* Diet & Lifestyle Section */}
  <div className="space-y-4">
    <h3 className="text-xl font-semibold text-yellow-400">Diet & Lifestyle</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-md sm:text-lg font-medium">Meals per Day</label>
        <input
          type="number"
          value={formatValue(customer.mealsPerDay)}
          onChange={(e) => setCustomer({ ...customer, mealsPerDay: e.target.value })}
          className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-md sm:text-lg font-medium">Diet Type</label>
        <select
          value={formatValue(customer.dietType)}
          onChange={(e) => setCustomer({ ...customer, dietType: e.target.value })}
          className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Mixed">Mixed</option>
        </select>
      </div>
    </div>
    <div>
      <label className="block text-md sm:text-lg font-medium">Food Intolerances</label>
      <textarea
        value={formatValue(customer.foodIntolerances)}
        onChange={(e) => setCustomer({ ...customer, foodIntolerances: e.target.value })}
        className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
        rows="4"
      />
    </div>
  </div>
{/* Female Fertility History Section */}
{customer.gender === 'Female' && (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold text-pink-400">Female Fertility History</h3>
    
    {customer.maritalStatus === 'Married' ? (
      <div className="space-y-4">
        {/* Married Female Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-md sm:text-lg font-medium">Trying to Conceive For</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={formatValue(customer.femaleFertilityHistory?.marriedFemales?.tryingToConceiveFor?.value)}
                onChange={(e) => setCustomer({
                  ...customer,
                  femaleFertilityHistory: {
                    ...customer.femaleFertilityHistory,
                    marriedFemales: {
                      ...customer.femaleFertilityHistory.marriedFemales,
                      tryingToConceiveFor: {
                        ...customer.femaleFertilityHistory.marriedFemales.tryingToConceiveFor,
                        value: e.target.value
                      }
                    }
                  }
                })}
                className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={formatValue(customer.femaleFertilityHistory?.marriedFemales?.tryingToConceiveFor?.unit)}
                onChange={(e) => setCustomer({
                  ...customer,
                  femaleFertilityHistory: {
                    ...customer.femaleFertilityHistory,
                    marriedFemales: {
                      ...customer.femaleFertilityHistory.marriedFemales,
                      tryingToConceiveFor: {
                        ...customer.femaleFertilityHistory.marriedFemales.tryingToConceiveFor,
                        unit: e.target.value
                      }
                    }
                  }
                })}
                className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-md sm:text-lg font-medium">Menstrual Cycle Length (days)</label>
            <input
              type="number"
              value={formatValue(customer.femaleFertilityHistory?.marriedFemales?.menstrualCycleLength)}
              onChange={(e) => setCustomer({
                ...customer,
                femaleFertilityHistory: {
                  ...customer.femaleFertilityHistory,
                  marriedFemales: {
                    ...customer.femaleFertilityHistory.marriedFemales,
                    menstrualCycleLength: e.target.value
                  }
                }
              })}
              className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-md sm:text-lg font-medium">Flow</label>
            <select
              value={formatValue(customer.femaleFertilityHistory?.marriedFemales?.flow)}
              onChange={(e) => setCustomer({
                ...customer,
                femaleFertilityHistory: {
                  ...customer.femaleFertilityHistory,
                  marriedFemales: {
                    ...customer.femaleFertilityHistory.marriedFemales,
                    flow: e.target.value
                  }
                }
              })}
              className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="Light">Light</option>
              <option value="Moderate">Moderate</option>
              <option value="Heavy">Heavy</option>
            </select>
          </div>

          <div>
            <label className="block text-md sm:text-lg font-medium">Cycle Regularity</label>
            <select
              value={formatValue(customer.femaleFertilityHistory?.marriedFemales?.cycleRegularity)}
              onChange={(e) => setCustomer({
                ...customer,
                femaleFertilityHistory: {
                  ...customer.femaleFertilityHistory,
                  marriedFemales: {
                    ...customer.femaleFertilityHistory.marriedFemales,
                    cycleRegularity: e.target.value
                  }
                }
              })}
              className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="Regular">Regular</option>
              <option value="Irregular">Irregular</option>
            </select>
          </div>
        </div>

        {/* Pregnancy History */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-pink-300">Pregnancy History</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Pregnancies</label>
              <input
                type="number"
                value={formatValue(customer.femaleFertilityHistory?.marriedFemales?.pregnancyHistory?.pregnancies)}
                onChange={(e) => setCustomer({
                  ...customer,
                  femaleFertilityHistory: {
                    ...customer.femaleFertilityHistory,
                    marriedFemales: {
                      ...customer.femaleFertilityHistory.marriedFemales,
                      pregnancyHistory: {
                        ...customer.femaleFertilityHistory.marriedFemales.pregnancyHistory,
                        pregnancies: e.target.value
                      }
                    }
                  }
                })}
                className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Labour</label>
              <input
                type="number"
                value={formatValue(customer.femaleFertilityHistory?.marriedFemales?.pregnancyHistory?.labour)}
                onChange={(e) => setCustomer({
                  ...customer,
                  femaleFertilityHistory: {
                    ...customer.femaleFertilityHistory,
                    marriedFemales: {
                      ...customer.femaleFertilityHistory.marriedFemales,
                      pregnancyHistory: {
                        ...customer.femaleFertilityHistory.marriedFemales.pregnancyHistory,
                        labour: e.target.value
                      }
                    }
                  }
                })}
                className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Miscarriage</label>
              <input
                type="number"
                value={formatValue(customer.femaleFertilityHistory?.marriedFemales?.pregnancyHistory?.miscarriage)}
                onChange={(e) => setCustomer({
                  ...customer,
                  femaleFertilityHistory: {
                    ...customer.femaleFertilityHistory,
                    marriedFemales: {
                      ...customer.femaleFertilityHistory.marriedFemales,
                      pregnancyHistory: {
                        ...customer.femaleFertilityHistory.marriedFemales.pregnancyHistory,
                        miscarriage: e.target.value
                      }
                    }
                  }
                })}
                className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="space-y-4">
        {/* Unmarried Female Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Similar fields for unmarried females */}
          {/* Add fields as needed */}
        </div>
      </div>
    )}
  </div>
)}

{/* Male Fertility History Section */}
{customer.gender === 'Male' && (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold text-blue-400">Male Fertility History</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-md sm:text-lg font-medium">Trying to Conceive For</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            value={formatValue(customer.maleFertilityHistory?.tryingToConceiveFor?.value)}
            onChange={(e) => setCustomer({
              ...customer,
              maleFertilityHistory: {
                ...customer.maleFertilityHistory,
                tryingToConceiveFor: {
                  ...customer.maleFertilityHistory.tryingToConceiveFor,
                  value: e.target.value
                }
              }
            })}
            className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={formatValue(customer.maleFertilityHistory?.tryingToConceiveFor?.unit)}
            onChange={(e) => setCustomer({
              ...customer,
              maleFertilityHistory: {
                ...customer.maleFertilityHistory,
                tryingToConceiveFor: {
                  ...customer.maleFertilityHistory.tryingToConceiveFor,
                  unit: e.target.value
                }
              }
            })}
            className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
      </div>
    </div>

    <div>
      <label className="block text-md sm:text-lg font-medium">Previous Semen Analysis</label>
      <select
        value={formatValue(customer.maleFertilityHistory?.previousSemenAnalysis)}
        onChange={(e) => setCustomer({
          ...customer,
          maleFertilityHistory: {
            ...customer.maleFertilityHistory,
            previousSemenAnalysis: e.target.value
          }
        })}
        className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>

    {customer.maleFertilityHistory?.previousSemenAnalysis === 'Yes' && (
      <div>
        <label className="block text-md sm:text-lg font-medium">Semen Analysis Results</label>
        <textarea
          value={formatValue(customer.maleFertilityHistory?.semenAnalysisResults)}
          onChange={(e) => setCustomer({
            ...customer,
            maleFertilityHistory: {
              ...customer.maleFertilityHistory,
              semenAnalysisResults: e.target.value
            }
          })}
          className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
      </div>
    )}
  </div>
)}

{/* Family History Section */}
<div className="space-y-4">
  <h3 className="text-xl font-semibold text-red-400">Family History</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {Object.entries(customer.familyHistory || {}).map(([key, value]) => (
      <div key={key} className="flex items-center">
        <input
          type="checkbox"
          id={`family-${key}`}
          checked={value}
          onChange={(e) => setCustomer({
            ...customer,
            familyHistory: {
              ...customer.familyHistory,
              [key]: e.target.checked
            }
          })}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor={`family-${key}`} className="ml-2 block text-sm text-gray-100">
          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
        </label>
      </div>
    ))}
  </div>
</div>

  {/* Submit Button */}
  <div className="flex justify-end mt-6">
    <button
      type="submit"
      className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Update Customer
    </button>
  </div>
</form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UpdateCustomer;
