import React, { useState, useEffect } from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';

const PackageShow = () => {
  const { id } = useParams(); // Get the package ID from URL params
  const navigate = useNavigate();

  const [packageData, setPackageData] = useState(null);
  const [variationData, setVariationData] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Fetch the package data based on the package ID
    const fetchPackageData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/getonepackage/${id}`);
        const data = await response.json();
        setPackageData(data); // Store package data in state

        // Check if the package has a variation ID and fetch variation data
        if (data.variation && data.variation._id) {
          const variationResponse = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/getonevariation/${data.variation._id}`);
          const variationData = await variationResponse.json();
          setVariationData(variationData); // Store variation data in state
        }
      } catch (error) {
        console.error('Error fetching package or variation data:', error);
      }
    };

    fetchPackageData();
  }, [id]);

  const handleVariationChange = (e) => {
    const selectedVariationOption = variationData?.options?.find(
      (option) => option.name === e.target.value
    );

    if (selectedVariationOption) {
      setSelectedVariation(selectedVariationOption);
      setTotalAmount((packageData?.price || 0) + selectedVariationOption.price);
    }
  };

  // ...existing code...

// ...existing code...

const handleBuyNow = async () => {
  try {
    // Validation checks
    if (!packageData || !packageData._id) {
      throw new Error("Package data is missing!");
    }

    if (variationData && !selectedVariation) {
      throw new Error("Please select a variation option!");
    }

    // Prepare packages data
    const packageDetails = {
      packageId: packageData._id,
      variationId: variationData?._id || null,
      variationOptionId: selectedVariation?._id || null
    };

    // Prepare the request body
    const buyData = {
      packages: [packageDetails]
    };

    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/createbuy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(buyData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create order');
    }

    const result = await response.json();
    // console.log('Success:', result);
    // alert('Package purchased successfully! Go To Checkout!');
     navigate(`/checkout/${result._id}`);
    // Optional: Redirect to success page or order history
    // navigate('/success');

  } catch (error) {
    console.error('Error:', error);
    alert(error.message || 'Failed to process purchase');
  }
};

// ...existing code...

// ...existing code...

  if (!packageData || !variationData) {
    return <div>Loading...</div>; // Show loading until the data is available
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 dark:bg-gray-700 dark:text-white duration-200">
        <div className="container mx-auto px-4 sm:px-1 lg:px-3 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side: Product image */}
            <div className="flex justify-center">
              <img
                className=" w-full h-[250px] md:h-[400px] sm:h-[300px] rounded-lg shadow-md"
                src={`${import.meta.env.VITE_BACKEND_API}/uploads/${packageData.image}`} // Image path assuming it's in uploads folder
                alt={packageData.name}
              />
            </div>

            {/* Right side: Product details */}
            <div className="space-y-2">
              <h3 className="text-xl sm:text-3xl font-mono font-light text-gray-900 -mb-2">{packageData.name}</h3>
              <hr className="border-gray-900 w-12 border-2 " />
              <h3 className="text-2xl font-mono font-medium text-red-600 ">Rs:{packageData.price}</h3>
              <h3 className='text-gray-400 italic text-sm '>Tax included</h3>
              <hr className="border-gray-400 " />

              {variationData && (
                <div>
                  <h4 className="text-xl font-mono font-light text-gray-800 ">Select Variation</h4>
                  <form>
                    {variationData.options?.map((option) => (
                      <div key={option.name} className="flex items-center mb-4">
                        <input
                          type="radio"
                          id={option.name}
                          name="variation"
                          value={option.name}
                          onChange={handleVariationChange}
                          className="mr-2"
                        />
                        <label htmlFor={option.name} className="text-lg text-gray-700 font-mono font-light">{option.name}</label>
                      </div>
                    ))}
                  </form>

                  {selectedVariation && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                      <p className="text-gray-700 text-lg font-mono font-light">Description: {selectedVariation.description}</p>
                      <p className="text-xl  text-gray-800 font-mono font-light">Price: Rs: {selectedVariation.price}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="justify-center mt-8 ">
                <button className=" py-2 w-full bg-blue-500 text-white text-lg font-semibold  shadow-md hover:bg-blue-700">
                  Add to Cart
                </button>
                <div className="flex justify-center mt-2">
                  <button 
                    onClick={handleBuyNow} 
                    className=" py-2 w-full bg-red-600 text-white text-lg font-semibold  shadow-md hover:bg-gray-900">
                    Buy Now
                  </button>
                </div>
                <div className='flex justify-center mt-2 text-red-600 sm:text-2xl text-md'>
                  <p>Save Upto 20% on your first purchase!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="sm:text-4xl text-xl font-mono font-light text-center text-primary mt-2 sm:mt-10 mb-5">Description</h2>
        <div className="flex pl-5 sm:pl-16 mt-5  ">
          <p className="text-gray-700 text-lg">{packageData.description}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PackageShow;
