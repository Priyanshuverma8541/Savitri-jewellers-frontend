import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../App";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, user } = useAuth();

  const handleCart = async (productId) => {
    if (!isAuthenticated || !user?._id) {
      alert("Please login to add to cart");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/carts", {
        user: user._id, // Corrected user ID reference
        items: [{ product: productId, quantity: 1 }],
      });
      alert("Added to cart");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
      {products.map((product) => (
        <div key={product._id} className="bg-white p-4 shadow-lg rounded-lg text-center">
          <img
            src={product.images?.length > 0 ? product.images[0] : "https://via.placeholder.com/300"}
            alt={product.name}
            className="w-full h-48 object-cover mb-4 rounded-md"
          />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">${product.price}</p>
          <button
            onClick={() => handleCart(product._id)}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </section>
  );
};

export default Product;



// import React, { useEffect, useState } from 'react'; 
// import axios from 'axios';
// import { useAuth } from "../App";

// const Product = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { isAuthenticated, user } = useAuth();

//   const handleCart = async (productId) => {
//     if (!isAuthenticated) {
//       alert('Please login to add to cart');
//       return;
//     }

//     try {
//       await axios.post('http://localhost:8080/api/carts', {
//         userId: user.id,  // Send the user ID
//         product: productId,  // Correct property name
//         quantity: 1
//       });
//       alert('Added to cart');
//     } catch (err) {
//       alert('Failed to add to cart');
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/products');
//         setProducts(response.data);
//       } catch (err) {
//         setError('Failed to load products');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading products...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

//   return (
//     <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
//       {products.map((product) => (
//         <div key={product._id} className="bg-white p-4 shadow-lg rounded-lg text-center">
//           <img 
//             src={product.images?.length > 0 ? product.images[0] : 'https://via.placeholder.com/300'} 
//             alt={product.name} 
//             className="w-full h-48 object-cover mb-4 rounded-md" 
//           />
//           <h3 className="text-lg font-semibold">{product.name}</h3>
//           <p className="text-gray-600">${product.price}</p>
//           <button 
//             onClick={() => handleCart(product._id)} 
//             className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
//           >
//             Add to Cart
//           </button>
//         </div>
//       ))}
//     </section>
//   );
// };

// export default Product;

