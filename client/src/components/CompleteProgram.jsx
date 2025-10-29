import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';

const CompleteProgram = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}api/getprogram/${id}`);
        const data = await response.json();
        setProgram(data);
      } catch (error) {
        console.error('Error fetching program:', error);
      }
    };
    fetchProgram();
  }, [id]);

  if (!program) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-primary border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img
              className="w-full h-[150px] md:h-[400px] sm:h-[250px] rounded-md object-cover"
              src={`${import.meta.env.VITE_BACKEND_API}uploads/${program.image}`}
              alt={program.heading}
            />
            <h1 className="text-3xl font-semibold mt-6">{program.heading}</h1>
            <p className="text-gray-700 mt-4">{program.description}</p>
            <div className="prose max-w-none mt-6">
              <div dangerouslySetInnerHTML={{ __html: program.content }} />
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="bg-white rounded-md p-4 shadow-sm">
              <h3 className="font-semibold mb-2">Related</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="border-b pb-2">Quick Tips</li>
                <li className="border-b pb-2">Program FAQs</li>
                <li className="border-b pb-2">Contact Counselor</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CompleteProgram;
