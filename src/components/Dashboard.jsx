import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaBoxOpen, FaShoppingCart, FaClipboardList, FaUser} from "react-icons/fa";
// FaGem, , FaNecklace, FaEarring, FaBracelet 
import Footer from "./Footer";
import Slider from "./Slider";


const Dashboard = () => {
  const location = useLocation();

  // Helper to determine if current path matches
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-200 via-purple-100 to-yellow-100">
      {/* Navbar */}
      <Navbar />
      

      <div className="max-w-7xl mx-auto px-6 py-16 mt-12">
        {/* User Greeting */}
        <div className="mb-10 text-center">
          <img
            src="../public/logo.png"
            alt="Savitri Jewels Logo"
            className="mx-auto mb-4 w-48 sm:w-60"
          />

          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Jewellery for Every Occasion
          </h1>
          <h2 className="text-2xl font-semibold text-center text-[#d1a72d]">
            We Make You Feel Special
          </h2>
          
        </div>
        
  
        {/* Dashboard Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            to="products"
            isActive={isActive("products")}
            icon={<FaBoxOpen className="text-indigo-500 text-4xl mx-auto mb-4" />}
            title="Products"
            description="Manage and add new items"
          />
          <DashboardCard
            to="cart"
            isActive={isActive("cart")}
            icon={<FaShoppingCart className="text-green-500 text-4xl mx-auto mb-4" />}
            title="Cart"
            description="View and edit your cart"
          />
          <DashboardCard
            to="orders"
            isActive={isActive("orders")}
            icon={<FaClipboardList className="text-purple-500 text-4xl mx-auto mb-4" />}
            title="Orders"
            description="Track your orders"
          />
          <DashboardCard
            to="profile"
            isActive={isActive("profile")}
            icon={<FaUser className="text-yellow-500 text-4xl mx-auto mb-4" />}
            title="Profile"
            description="Update your information"
          />
        </div>

        {/* Outlet Area for Nested Routes */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-6">
          <Outlet />
        </div>
      </div>
      <Slider/>
      <Footer />
    </div>
  );
};

// Reusable DashboardCard Component with highlight
const DashboardCard = ({ to, icon, title, description, isActive }) => {
  return (
    <Link
      to={to}
      className={`rounded-2xl p-6 text-center transition shadow-lg hover:shadow-xl ${isActive
        ? "bg-gray-200 border-2 border-indigo-400 scale-105"
        : "bg-white"
        }`}
    >
      {icon}
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-500 text-sm mt-1">{description}</p>
    </Link>
  );
};

export default Dashboard;

