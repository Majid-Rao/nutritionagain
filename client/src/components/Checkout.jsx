import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [buyData, setBuyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    email: "",
    phone: "",
    address: "",
    pastPatientHistory: "",
  });

  useEffect(() => {
    const fetchBuyData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/onebuy/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch buy data');
        }
        const data = await response.json();
        setBuyData(data);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error loading checkout details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBuyData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

// ...existing code...

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Validate buyData
    if (!buyData?.packages?.length) {
      toast.error("No package data available");
      return;
    }

    // Validate form data
    const requiredFields = ['name', 'age', 'weight', 'email', 'phone', 'address'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }

    // Format customer data
    const customer = {
      name: formData.name.trim(),
      age: Number(formData.age),
      weight: Number(formData.weight),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      pastPatientHistory: formData.pastPatientHistory?.trim() || "",
    };

    // Format package data with proper selectedOption structure
    const packages = buyData.packages.map(pkg => {
      if (!pkg.package?._id) {
        throw new Error('Invalid package reference');
      }

      // Ensure price exists and is a number
      const price = pkg.selectedOption?.price || pkg.price;
      if (!price) {
        throw new Error('Invalid price for package');
      }

      return {
        package: pkg.package._id,
        variation: pkg.variation?._id || null,
        selectedOption: pkg.selectedOption ? {
          optionId: pkg.variation?.options?.find(opt => opt.name === pkg.selectedOption.name)?._id,
          name: pkg.selectedOption.name,
          price: Number(pkg.selectedOption.price)
        } : null,
        price: Number(price)
      };
    });

    // Calculate total from packages
    const totalAmount = packages.reduce((sum, pkg) => sum + pkg.price, 0);

    const orderData = {
      customer,
      packages,
      totalAmount,
      status: 'pending'
    };

    // Validate final data
    if (!orderData.totalAmount || orderData.totalAmount <= 0) {
      throw new Error('Invalid total amount');
    }

    

    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/createorders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData)
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Server error:', result);
      throw new Error(result.error || result.message || 'Failed to place order');
    }

    alert("Order placed successfully!");

  } catch (error) {
    console.error("Order creation error:", {
      message: error.message,
      stack: error.stack,
      data: buyData
    });
    toast.error(error.message || "Failed to place order. Please try again.");
  }
};

// ...existing code...


  // ... Rest of the component remains the same ...
  // (Keep the loading state and return JSX from previous implementation)

  if (!buyData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 dark:bg-gray-700 dark:text-white duration-200">
        <div className="container mx-auto px-4 sm:px-1 lg:px-3 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side: Customer details form */}
            <div className="space-y-6">
              <h3 className="text-3xl font-semibold text-gray-800 mb-6">Customer Details</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-white border border-gray-300"
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <div className="w-full">
                    <label className="block text-gray-700">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md bg-white border border-gray-300"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-gray-700">Weight</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md bg-white border border-gray-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-white border border-gray-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-white border border-gray-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-white border border-gray-300"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700">Past Patient History (Optional)</label>
                  <textarea
                    name="pastPatientHistory"
                    value={formData.pastPatientHistory}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-white border border-gray-300"
                  ></textarea>
                </div>

               
              </form>
            </div>

            {/* Right side: Package details */}
        {/* Order Summary Card */}
        <div className="lg:col-span-1">
   <div className="bg-white rounded-lg shadow-lg p-6 h-fit sticky top-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-4">
              {buyData?.packages.map((pkg, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Package:</span>
                    <span>{pkg.package.name}</span>
                  </div>
                  {pkg.selectedOption && (
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium">Variation:</span>
                      <span>{pkg.selectedOption.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Price:</span>
                    <span>Rs. {pkg.price}</span>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between items-center py-4 border-t border-b text-lg font-semibold">
                <span>Total Amount:</span>
                <span>Rs. {buyData?.totalAmount}</span>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
              >
                Place Order
              </button>

              <p className="text-sm text-gray-500 text-center mt-4">
                By placing this order, you agree to our Terms and Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
