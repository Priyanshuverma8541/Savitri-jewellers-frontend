import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://savitri-jewellers-backend.onrender.com/api/users/register', {
        name,
        email,
        password,
        address,
      });

      alert('Registration successful! You can now log in.');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      setError(err.response ? err.response.data.error : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Register</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 font-semibold text-white rounded-md ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registration;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Registration = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [address, setAddress] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await axios.post('http://localhost:8080/api/users/register', {
//         name,
//         email,
//         password,
//         address,
//       });

//       alert('Registration successful! You can now log in.');
//       navigate('/login'); // Redirect to login page after successful registration
//     } catch (err) {
//       setError(err.response ? err.response.data.error : 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="registration-container">
//       <h2>Register</h2>
//       {error && <div className="error-message">{error}</div>}
//       <form onSubmit={handleRegister}>
//         <div>
//           <label>Name</label>
//           <input 
//             type="text" 
//             value={name} 
//             onChange={(e) => setName(e.target.value)} 
//             required 
//           />
//         </div>
//         <div>
//           <label>Email</label>
//           <input 
//             type="email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input 
//             type="password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             required 
//           />
//         </div>
//         <div>
//           <label>Address</label>
//           <input 
//             type="text" 
//             value={address} 
//             onChange={(e) => setAddress(e.target.value)} 
//           />
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? 'Registering...' : 'Register'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Registration;


// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Registration = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "", address: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async () => {
//     try {
//       const response = await axios.post("http://localhost:8080/api/users/register", formData);
//       setMessage(response.data.message);
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (error) {
//       setMessage(error.response?.data?.error || "Registration failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
//         <input type="text" name="name" placeholder="Name" className="w-full p-2 border rounded mb-3" onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded mb-3" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded mb-3" onChange={handleChange} required />
//         <input type="text" name="address" placeholder="Address" className="w-full p-2 border rounded mb-3" onChange={handleChange} />
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600" onClick={handleRegister}>Register</button>
//         {message && <p className="text-center mt-4 text-red-500">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default Registration;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Registration = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '', address: '' });
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async () => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/users/register', formData);
//       setMessage(response.data.message);
//       setTimeout(() => navigate('/login'), 2000);
//     } catch (error) {
//       setMessage(error.response?.data?.error || 'Registration failed');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
//         <input type="text" name="name" placeholder="Name" className="w-full p-2 border rounded mb-3" onChange={handleChange} />
//         <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded mb-3" onChange={handleChange} />
//         <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded mb-3" onChange={handleChange} />
//         <input type="text" name="address" placeholder="Address" className="w-full p-2 border rounded mb-3" onChange={handleChange} />
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600" onClick={handleRegister}>Register</button>
//         {message && <p className="text-center mt-4 text-red-500">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default Registration;