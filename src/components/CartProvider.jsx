import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../App"; // 🔁 adjust path if your AuthContext is in another file

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user, token } = useAuth();

  const userId = user?._id;

  // ✅ Fetch cart items
  const fetchCart = async () => {
    if (!userId || !token) return;

    try {
      const response = await axios.get(`http://localhost:8080/api/carts/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(response.data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error.message);
    }
  };

  // ✅ Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    if (!userId || !token) return;

    try {
      const response = await axios.post(
        `http://localhost:8080/api/carts/add/${userId}`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems(response.data.items || []);
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  // ✅ Remove item from cart
  const removeFromCart = async (productId) => {
    if (!userId || !token) return;

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/carts/remove/${userId}/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems(response.data.items || []);
    } catch (error) {
      console.error("Error removing from cart:", error.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId, token]); // fetch cart whenever user/token changes

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

