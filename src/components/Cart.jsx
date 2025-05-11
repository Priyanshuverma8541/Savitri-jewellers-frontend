import React from "react";
import { useCart } from "./CartProvider";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.productId?.price || 0) * item.quantity;
    }, 0);
  };

  const handleBuyNow = (productId) => {
    alert(`Proceeding to buy product: ${productId}`);
    // Here you can redirect to checkout or payment page
  };

  return (
    <div className="max-w-5xl mx-auto mt-20 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-lg text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between border p-4 rounded-xl shadow-lg bg-white"
            >
              <div className="flex items-center space-x-6">
                <img
                  src={item.productId?.images?.[0] || "https://via.placeholder.com/100"}
                  alt={item.productId?.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{item.productId?.name}</h3>
                  <p className="text-gray-600">Price: ₹{item.productId?.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => handleBuyNow(item.productId?._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => removeFromCart(item.productId?._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-2xl font-bold text-right mt-10 text-gray-700">
            Total: ₹{getTotal().toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
