import React, { useEffect, useState } from "react";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to view your orders");
        setLoading(false);
        return;
      }

      const response = await axios.get("https://savitri-jewellers-backend.onrender.com/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(response.data);
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (amount, orderId) => {
    try {
      const res = await fetch("https://savitri-jewellers-backend.onrender.com/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "Savitri Jewellers",
        description: `Payment for Order ID: ${orderId}`,
        order_id: data.id,
        handler: async (response) => {
          const verifyRes = await fetch("https://savitri-jewellers-backend.onrender.com/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...response, orderId }),
          });

          const result = await verifyRes.json();
          alert(result.message || "Payment successful! Order marked as received.");
          fetchOrders(); // refresh orders after payment
        },
        theme: { color: "#F37254" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Error initiating payment. Please try again.");
    }
  };

  if (loading)
    return <p className="text-center text-gray-600 mt-10">Loading orders...</p>;

  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="container mx-auto mt-10 p-6">
      <h2 className="text-2xl font-semibold text-center mb-6 mt-5">Your Orders</h2>

      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Order ID: {order._id}</h3>
              <p className="text-gray-700">
                <span className="font-semibold">Total Amount:</span> ₹{order.totalAmount}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-lg text-white ${
                    order.status === "Pending"
                      ? "bg-yellow-500"
                      : order.status === "Completed"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {order.status === "Completed" ? "Received" : order.status}
                </span>
              </p>

              <h4 className="mt-4 font-semibold">Products:</h4>
              <ul className="mt-2">
                {order.products.map((item) => (
                  <li
                    key={item.product._id}
                    className="flex items-center gap-3 border-b py-2"
                  >
                    <img
                      src={item.product.images?.[0] || "https://via.placeholder.com/50"}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <span className="text-gray-800">{item.product.name}</span> -{" "}
                    <span className="text-gray-600">{item.quantity} pcs</span>
                  </li>
                ))}
              </ul>

              {order.status === "Pending" && (
                <button
                  onClick={() => handlePayment(order.totalAmount * 100, order._id)}
                  className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
                >
                  Buy Now
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No orders found</p>
      )}
    </div>
  );
};

export default Order;
