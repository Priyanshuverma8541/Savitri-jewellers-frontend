// Login.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../App"; // ✅ adjust path based on where App.jsx is

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      alert("Login successful!");
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.message ||
        "Login failed. Please check your credentials.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>

        {error && <div className="text-red-500 text-center text-sm">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 font-semibold text-white rounded-md transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <NavLink to="/registration" className="text-blue-500 hover:underline">
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;


// import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
// import Home from "./page/Home";
// import About from "./page/About";
// import Error from "./page/Error";
// import Login from "./page/Login";
// import Product from "./components/Product";
// import Registration from "./page/Registration";
// import Navbar from "./components/Navbar";
// import Order from "./components/Order";
// import Cart from "./components/Cart";
// import Dashboard from "./components/Dashboard";
// import Profile from "./components/Profile";
// import Header from "./components/Header";
// import Slider from "./components/Slider";
// import Footer from "./components/Footer";
// import Section from "./components/Section";
// import Contact from "./components/Contact";
// import Services from "./components/Services";
// import CartProvider from "./components/CartProvider";
// import { useAuth } from "./AuthProvider"; // ✅ Import from separate file

// // ✅ ProtectedRoute component
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// // ✅ Public layout
// const PublicLayout = () => (
//   <>
//     <Header />
//     <Outlet />
//     <Slider />
//     <Section />
//     <Footer />
//   </>
// );

// const App = () => {
//   return (
//     <CartProvider>
//       <Router>
//         <Routes>
//           <Route element={<PublicLayout />}>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/product" element={<Product />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/services" element={<Services />} />
//             <Route path="/registration" element={<Registration />} />
//             <Route path="/error" element={<Error />} />
//           </Route>

//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="products" element={<Product />} />
//             <Route path="cart" element={<Cart />} />
//             <Route path="orders" element={<Order />} />
//             <Route path="profile" element={<Profile />} />
//           </Route>

//           <Route path="*" element={<Error />} />
//         </Routes>
//       </Router>
//     </CartProvider>
//   );
// };

// export default App;

