import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                    <NavLink to="/services" className="block lg:inline-block text-yellow-500 hover:text-yellow-600">
                        Services
                    </NavLink>
                    <NavLink to="/contact" className="block lg:inline-block text-yellow-500 hover:text-yellow-600">
                        Contact
                    </NavLink>
                    <NavLink to="/login"  className="block lg:inline-block text-yellow-500 hover:text-yellow-600">
                        Login
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Header;
