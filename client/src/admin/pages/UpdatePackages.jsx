import React, { useState, useEffect } from "react";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UpdatePackage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [variation, setVariation] = useState("");
  const [variations, setVariations] = useState([]);
  const [currentImage, setCurrentImage] = useState(""); // For storing the current image path

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the current package details
  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/api/getonepackage/${id}`
        );
        const pkg = response.data;
        setName(pkg.name);
        setDescription(pkg.description);
        setPrice(pkg.price);
        setVariation(pkg.variation._id); // Assuming variation is an object and we store its _id
        setCurrentImage(pkg.image); // Store the current image URL (for displaying)
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    const fetchVariations = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/getallvariations`);
        const result = await response.json();
        setVariations(result);
      } catch (error) {
        console.error("Error fetching variations:", error);
      }
    };

    fetchPackageData();
    fetchVariations();
  }, [id]);

  // Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission for updating the package
  const handleSubmit = async (e) => {
    e.preventDefault();

     const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("variation", variation);
    
    // Only append image if a new one is selected
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/api/updatepackage/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        toast.success("Package updated successfully!", {
          position: "top-center",
        });
        navigate("/viewpackages");
      } else {
        console.error("Error updating package:", response.statusText);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Error updating package!");
    }
  };

  return (
    <>
      <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
        <Sidebar />
        <div className="flex-1 overflow-auto relative z-10">
          <Header title="Update Package" />
          <main className="max-w-5xl mx-auto py-4 px-2 sm:px-4 lg:px-8">
            <div className="max-w-md mx-auto p-4 sm:p-6 bg-black text-white rounded-lg shadow-lg">
              <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-500 mb-6">
                Update Package
              </h1>
              <form onSubmit={handleSubmit} className="space-y-1">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-md sm:text-lg font-medium">
                    Name
                  </label>
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
                  <label htmlFor="description" className="block text-md sm:text-lg font-medium">
                    Description
                  </label>
                  <textarea
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
                  <label htmlFor="price" className="block text-md sm:text-lg font-medium">
                    Price
                  </label>
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

                {/* Variation (Readonly) */}
                <div>
                  <label htmlFor="variation" className="block text-md sm:text-lg font-medium">
                    Variation
                  </label>
                  <input
                    type="text"
                    id="variation"
                    name="variation"
                    value={variations.find((varia) => varia._id === variation)?.name || "Loading..."}
                    readOnly
                    className="w-full mt-2 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Image Preview and Upload */}
                <div>
                  <label htmlFor="image" className="block text-md sm:text-lg font-medium">
                    Upload Image
                  </label>
                  {currentImage && (
                    <div className="mb-4">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_API}/uploads/${currentImage}`}
                        alt="Current Package"
                        className="w-24 h-18 object-cover mb-2"
                      />
                      <p className="text-sm text-gray-400">Current Image</p>
                    </div>
                  )}
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

export default UpdatePackage;
