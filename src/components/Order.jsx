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

      const response = await axios.get("http://localhost:8080/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch orders");
      setLoading(false);
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
                  {order.status}
                </span>
              </p>

              <h4 className="mt-4 font-semibold">Products:</h4>
              <ul className="mt-2">
                {order.products.map((item) => (
                  <li key={item.product._id} className="flex items-center gap-3 border-b py-2">
                    <img
                      src={item.product.images?.[0] || "https://via.placeholder.com/50"}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <span className="text-gray-800">{item.product.name}</span> - 
                    <span className="text-gray-600">{item.quantity} pcs</span>
                  </li>
                ))}
              </ul>
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



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Order = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     const fetchOrders = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get('http://localhost:8080/api/orders', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setOrders(response.data);
//             setLoading(false);
//         } catch (err) {
//             setError('Failed to fetch orders');
//             setLoading(false);
//         }
//     };

//     if (loading) return <p>Loading orders...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div>
//             <h2>Your Orders</h2>
//             {orders.length > 0 ? (
//                 <div>
//                     {orders.map((order) => (
//                         <div key={order._id}>
//                             <h3>Order ID: {order._id}</h3>
//                             <p>Total Amount: ₹{order.totalAmount}</p>
//                             <p>Status: {order.status}</p>
//                             <h4>Products:</h4>
//                             <ul>
//                                 {order.products.map((item) => (
//                                     <li key={item.product._id}>
//                                         {item.product.name} - {item.quantity} pcs
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p>No orders found</p>
//             )}
//         </div>
//     );
// };

// export default Order;
