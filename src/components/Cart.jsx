import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to view your cart");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:8080/api/carts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart(response.data);
    } catch (err) {
      setError("Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login to place an order");
      if (!cart || cart.items.length === 0) return alert("Your cart is empty");

      await axios.post(
        "http://localhost:8080/api/orders",
        { cartId: cart._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order placed successfully!");
      setCart(null);
    } catch (err) {
      alert("Failed to place order");
    }
  };

  if (loading) return <p className="text-center text-gray-600 mt-10">Loading cart...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="container mx-auto mt-10 p-6">
      <h2 className="text-2xl font-semibold text-center mb-6 mt-6">Your Cart</h2>

      {cart && cart.items?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.items.map((item) => (
            <div key={item.product._id} className="bg-white p-4 shadow-lg rounded-lg flex items-center gap-4">
              <img
                src={item.product.images?.[0] || "https://via.placeholder.com/100"}
                alt={item.product.name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div>
                <h4 className="text-lg font-semibold">{item.product.name}</h4>
                <p className="text-gray-700 font-medium">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Your cart is empty</p>
      )}

      {cart && cart.items?.length > 0 && (
        <button
          onClick={handleBuyNow}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Buy Now
        </button>
      )}
    </div>
  );
};

export default Cart;
