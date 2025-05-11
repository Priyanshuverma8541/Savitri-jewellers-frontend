import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaBoxOpen, FaShoppingCart, FaClipboardList, FaUser } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-200 via-purple-100 to-yellow-100">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16 mt-12">
        {/* User Greeting */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Welcome Back 👋
          </h1>
          <p className="text-lg text-gray-600">
            Manage your products, view your cart, orders, and update your profile easily.
          </p>
        </div>

        {/* Dashboard Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="products" className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">
            <FaBoxOpen className="text-indigo-500 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">Products</h2>
            <p className="text-gray-500 text-sm mt-1">Manage and add new items</p>
          </Link>

          <Link to="cart" className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">
            <FaShoppingCart className="text-green-500 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">Cart</h2>
            <p className="text-gray-500 text-sm mt-1">View and edit your cart</p>
          </Link>

          <Link to="orders" className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">
            <FaClipboardList className="text-purple-500 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">Orders</h2>
            <p className="text-gray-500 text-sm mt-1">Track your orders</p>
          </Link>

          <Link to="profile" className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">
            <FaUser className="text-yellow-500 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
            <p className="text-gray-500 text-sm mt-1">Update your information</p>
          </Link>
        </div>

        {/* Outlet Area for Nested Routes */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


// import React from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import Navbar from '../components/Navbar';

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* ✅ Show Navbar */}
//       <Navbar />

//       <div className="container mx-auto p-6 mt-20">
//         <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>

//         {/* ✅ Navigation Links for Dashboard Sections */}
//         <div className="flex space-x-4 mb-6">
//           <Link to="products" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Products</Link>
//           <Link to="cart" className="px-4 py-2 bg-green-500 text-white rounded-lg">Cart</Link>
//           <Link to="orders" className="px-4 py-2 bg-purple-500 text-white rounded-lg">Orders</Link>
//           <Link to="profile" className="px-4 py-2 bg-yellow-500 text-black rounded-lg">Profile</Link>
//         </div>

//         {/* ✅ Render the selected component inside Dashboard */}
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
