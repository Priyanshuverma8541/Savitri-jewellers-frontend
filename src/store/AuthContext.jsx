// import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

//     // Check if user is logged in when app loads
//     useEffect(() => {
//         const token = localStorage.getItem("authToken");
//         if (token) {
//             setUser({ token });
//         }
//     }, []);

//     // Login function
//     const login = (token) => {
//         localStorage.setItem("authToken", token);
//         setUser({ token });
//         navigate("/"); // Redirect to dashboard after login
//     };

//     // Logout function
//     const logout = () => {
//         localStorage.removeItem("authToken");
//         setUser(null);
//         navigate("/login"); // Redirect to login page after logout
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     return useContext(AuthContext);
// };
