// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import Home from "./page/Home";
import About from "./page/About";
import Error from "./page/Error";
import Login from "./page/Login";
import Product from "./components/Product";
import Registration from "./page/Registration";
import Navbar from "./components/Navbar";
import Order from "./components/Order";
import Cart from "./components/Cart";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Header from "./components/Header";
import Slider from "./components/Slider";
import Footer from "./components/Footer";
import Section from "./components/Section";
import Contact from "./components/Contact";
import Services from "./components/Services";
import CartProvider from "./components/CartProvider";

// 👇 AuthContext & Provider
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("https://savitri-jewellers-backend.onrender.com/api/users/login", {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user._id);

      setToken(token);
      setUser(user);
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {!loading ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicLayout = () => (
  <>
    <Header />
    <Outlet />
    <Slider />
    <Section />
    <Footer />
  </>
);

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/product" element={<Product />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/error" element={<Error />} />
              <Route path="/registration" element={<Registration />} />
            </Route>

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Navbar/> 
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route path="products" element={<Product />} />
              <Route path="cart" element={<Cart />} />
              <Route path="orders" element={<Order />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
