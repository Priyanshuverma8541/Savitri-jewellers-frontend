import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-gray-100 py-12 mt-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h2>
        <p className="text-center text-lg text-gray-600 mb-10">
          Reach out to us for any inquiries, custom jewelry orders, or store visits.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Buxar Branch */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800">Buxar, Bihar</h3>
            <p className="text-gray-600 mt-2 flex items-center">
              <FaMapMarkerAlt className="text-blue-500 mr-2" /> Main Road, Near City Mall, Buxar
            </p>
            <p className="text-gray-600 mt-2 flex items-center">
              <FaPhone className="text-green-500 mr-2" /> +91 6207855397
            </p>
            <p className="text-gray-600 mt-2 flex items-center">
              <FaEnvelope className="text-red-500 mr-2" /> contact@jewelstore.com
            </p>
          </div>

          {/* Varanasi Branch */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-800">Varanasi, Uttar Pradesh</h3>
            <p className="text-gray-600 mt-2 flex items-center">
              <FaMapMarkerAlt className="text-blue-500 mr-2" /> Lanka Road, Near BHU Gate, Varanasi
            </p>
            <p className="text-gray-600 mt-2 flex items-center">
              <FaPhone className="text-green-500 mr-2" /> +91 6207855397
            </p>
            <p className="text-gray-600 mt-2 flex items-center">
              <FaEnvelope className="text-red-500 mr-2" /> contact@jewelstore.com
            </p>
          </div>
        </div>

        {/* Founder Section */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold text-gray-800">Founder</h3>
          <p className="text-lg text-gray-600">Priyanshu Verma</p>
          <p className="text-gray-600 flex items-center justify-center mt-2">
            <FaPhone className="text-green-500 mr-2" /> +91 6207855397
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
