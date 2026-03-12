import React, { useState, useEffect } from 'react';
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import toast from "react-hot-toast";
const AddPackages = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [variation, setVariation] = useState('');
  const [variations, setVariations] = useState([]);

  // Fetch all variations on component mount
  useEffect(() => {
    const fetchVariations = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/getallvariations`);
        const result = await response.json();
        setVariations(result); // Assuming 'name' is available in variation
      } catch (error) {
        console.error('Error fetching variations:', error);
      }
    };

    fetchVariations();
  }, []);

  // Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to handle both text fields and file uploads
    const formData = new FormData();
    formData.append('name', name); // Append name
    formData.append('description', description); // Append description
    formData.append('price', price); // Append price
    if (image) formData.append('image', image); // Append image file
    if (variation) formData.append('variation', variation); // Append variation
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/addpackage`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Package added successfully:', result);
        // Optionally reset form after successful submission
        setName('');
        setDescription('');
        setPrice('');
        setImage(null);
        setVariation('');
         toast.success('Package added successfully!', {
          position: 'top-center',
        });
      } else {
        console.error('Error adding package:', response.statusText);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <>
      <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
        {/* Background */}
        <div className='fixed inset-0 z-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
          <div className='absolute inset-0 backdrop-blur-sm' />
        </div>
        <Sidebar />
        <div className='flex-1 overflow-auto relative z-10'>
          <Header title='Add Package' />
          <main className='max-w-5xl mx-auto py-4 px-2 sm:px-4 lg:px-8'>
            <div className="max-w-md mx-auto p-4 sm:p-6 bg-black text-white rounded-lg shadow-lg">
              <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-500 mb-6">Add Package</h1>
              <form onSubmit={handleSubmit} className="space-y-1">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-md sm:text-lg font-medium">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label htmlFor="description" className="block text-md sm:text-lg font-medium">Description</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    required
                  />
                </div>

                {/* Price Field */}
                <div>
                  <label htmlFor="price" className="block text-md sm:text-lg font-medium">Price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Variation Dropdown */}
                <div>
                  <label htmlFor="variation" className="block text-md sm:text-lg font-medium">Variation</label>
                  <select
                    id="variation"
                    name="variation"
                    value={variation}
                    onChange={(e) => setVariation(e.target.value)}
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Variation</option>
                    {variations.map((variation) => (
                      <option key={variation._id} value={variation._id}>{variation.name}</option>
                    ))}
                  </select>
                </div>

                {/* Image Upload */}
                <div>
                  <label htmlFor="image" className="block text-md sm:text-lg font-medium">Upload Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-4 py-2 mt-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                  >
                    Submit
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

export default AddPackages;
