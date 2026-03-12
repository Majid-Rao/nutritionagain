import { useState } from 'react';
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import toast from "react-hot-toast";
const AddVariation = () => {
  const [name, setName] = useState('');
  const [optionName, setOptionName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [options, setOptions] = useState([]);

  // Handle the addition of options
  const handleAddOption = () => {
    if (optionName && description && price) {
      setOptions([
        ...options,
        { name: optionName, description, price: parseFloat(price) }
      ]);
      setOptionName('');
      setDescription('');
      setPrice('');
    } else {
      alert('Please fill in all option details.');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalOptions = [...options];
    // If no options added via Add Option, but fields are filled, use those as the only option
    if (finalOptions.length === 0 && optionName && description && price) {
      finalOptions = [
        { name: optionName, description, price: parseFloat(price) }
      ];
    }

    if (finalOptions.length === 0) {
      alert('Please add at least one option or fill the option fields.');
      return;
    }

    const formData = {
      name,
      options: finalOptions,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/createvariation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();

        console.log('Variation added:', result);
        // Reset form after successful submission
        setName('');
        setOptionName('');
        setDescription('');
        setPrice('');
        setOptions([]);
        toast.success('Variation added successfully!', {
          position: 'top-center',
        });
      } else {
        console.error('Error adding variation:', response.statusText);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <>
      <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
        <div className='fixed inset-0 z-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
          <div className='absolute inset-0 backdrop-blur-sm' />
        </div>
        <Sidebar />
        <div className='flex-1 overflow-auto relative z-10'>
          <Header title='Add Variation' />
          <main className='max-w-5xl mx-auto py-4 px-2 sm:px-4 lg:px-8'>
            <div className="max-w-md mx-auto p-4 sm:p-6 bg-black text-white rounded-lg shadow-lg">
              <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-500 mb-6">Add Variation</h1>
              <form onSubmit={handleSubmit} className="space-y-1">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-md sm:text-lg font-medium">Package Name</label>
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

                {/* Option Name Field */}
                <div>
                  <label htmlFor="optionName" className="block text-md sm:text-lg font-medium">Option Name</label>
                  <input
                    type="text"
                    id="optionName"
                    name="optionName"
                    value={optionName}
                    onChange={(e) => setOptionName(e.target.value)}
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  />
                </div>

                {/* Add Option Button */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="px-4 py-2 mt-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                  >
                    Add Option
                  </button>
                </div>

                {/* Display added options */}
                {options.length > 0 && (
                  <div className="mt-4">
                    <h2 className="text-lg font-bold">Added Options:</h2>
                    <ul className="space-y-2">
                      {options.map((option, index) => (
                        <li key={index} className="bg-gray-800 p-2 rounded-md">
                          <p><strong>Name:</strong> {option.name}</p>
                          <p><strong>Description:</strong> {option.description}</p>
                          <p><strong>Price:</strong> ${option.price}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-4 py-2 mt-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 focus:outline-none"
                  >
                    Submit Variation
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

export default AddVariation;