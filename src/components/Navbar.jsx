import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../App"; // Import Auth Context
import "./header.css";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { logout } = useAuth(); // Get logout function from context
    const navigate = useNavigate(); // React Router hook for navigation

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        logout(); // Set authentication to false
        navigate("/"); // Redirect to Home (which will show Header)
    };

    return (
        <header className="top">
            <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
                <NavLink to="/" className="text-yellow-500 text-lg font-bold">
                    <span className="text-yellow-600">Savitri</span>Jewels
                </NavLink>

                <button
                    className="lg:hidden text-yellow-500 focus:outline-none"
                    aria-label="Toggle Menu"
                    onClick={toggleMenu}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>

                <div className={`lg:flex space-x-8 ${isMenuOpen ? "block" : "hidden"} w-full lg:w-auto`}>
                    <NavLink to="/" className="block lg:inline-block text-yellow-500 hover:text-yellow-600">
                        Home
                    </NavLink>
                    <NavLink to="/about" className="block lg:inline-block text-yellow-500 hover:text-yellow-600">
                        About
                    </NavLink>
                    <NavLink to="/product" className="block lg:inline-block text-yellow-500 hover:text-yellow-600">
                        Product
                    </NavLink>
                    <NavLink to="/carts" className="block lg:inline-block text-yellow-500 hover:text-yellow-600">
                        Carts
                    </NavLink>
                    <NavLink to="/orders" className="block lg:inline-block text-yellow-500 hover:text-yellow-600">
                        Orders
                    </NavLink>
                    {/* Logout Button */}
                    <button onClick={handleLogout} className="block lg:inline-block text-yellow-500 hover:text-yellow-600">
                        Logout
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
