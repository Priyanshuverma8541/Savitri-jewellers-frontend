import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import DefaultLayout from "./components/defaultLayout/defaultLayout";
import Home from "./page/Home";
import About from "./page/About";
import Error from "./page/Error";
import Login from "./page/Login";
import Product from "./components/Product";
import Registration from "./page/Registration";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Order from "./components/Order";
import Cart from "./components/Cart";

// Create Auth Context to handle authentication globally
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to manage login and logout state
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); // ✅ Ensure correct key is used
    if (token) {
      axios
        .get("http://localhost:8080/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data.user);
          setIsAuthenticated(true);
        })
        .catch(() => {
          setIsAuthenticated(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token); // ✅ Use "token", not "authToken"
      setUser(response.data.user);
      setIsAuthenticated(true);
      

    } catch (error) {
      console.error("Login failed", error);
    }
    
  }
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {!loading ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
};

// ✅ Force re-render by using `key` based on `isAuthenticated`
const DefaultLayoutWrapper = () => {
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    console.log("Auth state changed:", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div key={isAuthenticated ? "authenticated" : "guest"}>
      {isAuthenticated ? <Navbar /> : <Header />}
      <DefaultLayout />
    </div>
  );
};

// Routes Setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayoutWrapper />,
    children: [
      { index: true, element: <Home /> },
      { path: "product", element: <Product /> },
      { path: "about", element: <About /> },
      {
        path: "orders",
        element: <Order />,
        loader: () => {
          if (!localStorage.getItem("token")) {
            return redirect("/login");
          }
        },
      },
      {
        path: "carts",
        element: <Cart />,
        loader: () => {
          if (!localStorage.getItem("token")) {
            return redirect("/login");
          }
        },
      },
      { path: "*", element: <Error /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/registration", element: <Registration /> },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;


// import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
// import { useState, createContext, useContext, useEffect } from "react";
// import axios from "axios";
// import DefaultLayout from "./components/defaultLayout/defaultLayout";
// import Home from "./page/Home";
// import About from "./page/About";
// import Error from "./page/Error";
// import Login from "./page/Login";
// import Product from "./components/Product";
// import Registration from "./page/Registration";
// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import Order from "./components/Order";
// import Cart from "./components/Cart";

// // Create Auth Context to handle authentication globally
// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// // AuthProvider component to manage login and logout state
// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios
//         .get("http://localhost:8080/api/users/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((response) => {
//           setUser(response.data.user);
//           setIsAuthenticated(true);
//         })
//         .catch(() => {
//           setIsAuthenticated(false);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post("http://localhost:8080/api/users/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", response.data.token); // ✅ Store token first
//       setUser(response.data.user);
//       setIsAuthenticated(true);

//       // ✅ Force re-render by refreshing the page
//       window.location.reload();
//     } catch (error) {
//       console.error("Login failed", error);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem("token"); // ✅ Clear token on logout
//     window.location.reload(); // ✅ Ensure UI updates immediately
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {!loading ? children : <p>Loading...</p>}
//     </AuthContext.Provider>
//   );
// };

// // ✅ Ensure DefaultLayoutWrapper updates when `isAuthenticated` changes
// const DefaultLayoutWrapper = () => {
//   const { isAuthenticated } = useAuth();
  
//   useEffect(() => {
//     console.log("Auth state changed:", isAuthenticated); // ✅ Debug authentication changes
//   }, [isAuthenticated]);

//   return (
//     <>
//       {isAuthenticated ? <Navbar /> : <Header />}
//       <DefaultLayout />
//     </>
//   );
// };

// // Routes Setup: Protect routes that require authentication (like Order, Cart)
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <DefaultLayoutWrapper />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "product", element: <Product /> },
//       { path: "about", element: <About /> },
//       {
//         path: "orders",
//         element: <Order />,
//         loader: () => {
//           if (!localStorage.getItem("token")) {
//             return redirect("/login");
//           }
//         },
//       },
//       {
//         path: "carts",
//         element: <Cart />,
//         loader: () => {
//           if (!localStorage.getItem("token")) {
//             return redirect("/login");
//           }
//         },
//       },
//       { path: "*", element: <Error /> },
//     ],
//   },
//   { path: "/login", element: <Login /> },
//   { path: "/registration", element: <Registration /> },
// ]);

// // Main App component
// const App = () => {
//   return (
//     <AuthProvider>
//       <RouterProvider router={router} />
//     </AuthProvider>
//   );
// };

// export default App;


// import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
// import { useState, createContext, useContext, useEffect } from "react";
// import axios from "axios";
// import DefaultLayout from "./components/defaultLayout/defaultLayout";
// import Home from "./page/Home";
// import About from "./page/About";
// import Error from "./page/Error";
// import Login from "./page/Login";
// import Product from "./components/Product";
// import Registration from "./page/Registration";
// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import Order from "./components/Order";
// import Cart from "./components/Cart";


// // Create Auth Context to handle authentication globally
// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// // AuthProvider component to manage login and logout state
// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true); // Loading state for initial authentication check

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios
//         .get("http://localhost:8080/api/users/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((response) => {
//           setUser(response.data.user);
//           setIsAuthenticated(true);
//         })
//         .catch(() => {
//           setIsAuthenticated(false);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post("http://localhost:8080/api/users/login", {
//         email,
//         password,
//       });

//       setUser(response.data.user);
//       setIsAuthenticated(true);
//       localStorage.setItem("token", response.data.token); // ✅ Ensure token is stored correctly

//       // ✅ Force re-render to update Navbar/Header immediately
//       window.location.reload();
//     } catch (error) {
//       console.error("Login failed", error);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem("token"); // ✅ Remove token from localStorage
//     window.location.reload(); // ✅ Ensure UI updates immediately
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {!loading ? children : <p>Loading...</p>} {/* ✅ Show loading state while checking auth */}
//     </AuthContext.Provider>
//   );
// };

// // Layout Wrapper that conditionally renders Navbar or Header
// const DefaultLayoutWrapper = () => {
//   const { isAuthenticated } = useAuth();
  
//   useEffect(() => {
//     console.log("Auth state changed:", isAuthenticated); // ✅ Debug authentication changes
//   }, [isAuthenticated]);

//   return (
//     <>
//       {isAuthenticated ? <Navbar /> : <Header />}
//       <DefaultLayout />
//     </>
//   );
// };

// // Routes Setup: Protect routes that require authentication (like Order, Cart)
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <DefaultLayoutWrapper />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "product", element: <Product /> },
//       { path: "about", element: <About /> },
//       {
//         path: "orders",
//         element: <Order />,
//         loader: () => {
//           if (!localStorage.getItem("token")) {
//             return redirect("/login");
//           }
//         },
//       },
//       {
//         path: "carts",
//         element: <Cart />,
//         loader: () => {
//           if (!localStorage.getItem("token")) {
//             return redirect("/login");
//           }
//         },
//       },
//       { path: "*", element: <Error /> },
//     ],
//   },
//   { path: "/login", element: <Login /> },
//   { path: "/registration", element: <Registration /> },
// ]);

// // Main App component
// const App = () => {
//   return (
//     <AuthProvider>
//       <RouterProvider router={router} />
//     </AuthProvider>
//   );
// };

// export default App;


// import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
// import { useState, createContext, useContext, useEffect } from "react";
// import axios from "axios";
// import DefaultLayout from "./components/defaultLayout/defaultLayout";
// import Home from "./page/Home";
// import About from "./page/About";
// import Error from "./page/Error";
// import Login from "./page/Login";
// import Product from "./components/Product";
// import Registration from "./page/Registration";
// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import Order from "./components/Order";
// import Cart from "./components/Cart";

// // Create Auth Context to handle authentication globally
// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// // AuthProvider component to manage login and logout state
// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true); // Loading state for initial authentication check

//   useEffect(() => {
//     // Check if there's a valid JWT token in localStorage and validate it
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios
//         .get("http://localhost:8080/api/users/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((response) => {
//           setUser(response.data.user);
//           setIsAuthenticated(true);
//         })
//         .catch(() => {
//           setIsAuthenticated(false);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post("http://localhost:8080/api/users/login", {
//         email,
//         password,
//       });

//       setUser(response.data.user);
//       setIsAuthenticated(true);
//       localStorage.setItem("token", response.data.token); // Store the JWT token securely
//     } catch (error) {
//       console.error("Login failed", error);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem("token"); // Clear token on logout
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {!loading ? children : <p>Loading...</p>} {/* Show loading state while checking auth */}
//     </AuthContext.Provider>
//   );
// };

// // Layout Wrapper that conditionally renders Navbar or Header
// const DefaultLayoutWrapper = () => {
//   const { isAuthenticated } = useAuth();
//   console.log(isAuthenticated); // Debug: Check the value of `isAuthenticated`
  
//   return (
//     <>
//       {isAuthenticated ? <Navbar /> : <Header />}
//       <DefaultLayout />
//     </>
//   );
// };

// // Routes Setup: Protect routes that require authentication (like Order, Cart)
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <DefaultLayoutWrapper />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "product", element: <Product /> },
//       { path: "about", element: <About /> },
//       {
//         path: "orders",
//         element: <Order />,
//         loader: () => {
//           // Redirect to login if the user is not authenticated
//           if (!localStorage.getItem("token")) {
//             return redirect("/login");
//           }
//         },
//       },
//       {
//         path: "carts",
//         element: <Cart />,
//         loader: () => {
//           // Redirect to login if the user is not authenticated
//           if (!localStorage.getItem("token")) {
//             return redirect("/login");
//           }
//         },
//       },
//       { path: "*", element: <Error /> },
//     ],
//   },
//   { path: "/login", element: <Login /> },
//   { path: "/registration", element: <Registration /> },
// ]);

// // Main App component
// const App = () => {
//   return (
//     <AuthProvider>
//       <RouterProvider router={router} />
//     </AuthProvider>
//   );
// };

// export default App;


// import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
// import { useState, createContext, useContext, useEffect } from "react";
// import axios from "axios";
// import DefaultLayout from "./components/defaultLayout/defaultLayout";
// import Home from "./page/Home";
// import About from "./page/About";
// import Error from "./page/Error";
// import Login from "./page/Login";
// import Product from "./components/Product";
// import Registration from "./page/Registration";
// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import Order from "./components/Order";
// import Cart from "./components/Cart";

// // Create Auth Context to handle authentication globally
// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// // AuthProvider component to manage login and logout state
// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true); // Loading state for initial authentication check

//   useEffect(() => {
//     // Check if there's a valid JWT token in localStorage and validate it
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios
//         .get("http://localhost:8080/api/users/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((response) => {
//           setUser(response.data.user);
//           setIsAuthenticated(true);
//         })
//         .catch(() => {
//           setIsAuthenticated(false);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post("http://localhost:8080/api/users/login", {
//         email,
//         password,
//       });

//       setUser(response.data.user);
//       setIsAuthenticated(true);
//       localStorage.setItem("token", response.data.token); // Store the JWT token securely
//     } catch (error) {
//       console.error("Login failed", error);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem("token"); // Clear token on logout
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {!loading ? children : <p>Loading...</p>} {/* Show loading state while checking auth */}
//     </AuthContext.Provider>
//   );
// };

// // Layout Wrapper that conditionally renders Navbar or Header
// const DefaultLayoutWrapper = () => {
//   const { isAuthenticated } = useAuth();
//   return (
//     <>
//       {isAuthenticated ? <Navbar /> : <Header />}
//       <DefaultLayout />
//     </>
//   );
// };

// // Routes Setup: Protect routes that require authentication (like Order, Cart)
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <DefaultLayoutWrapper />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "product", element: <Product /> },
//       { path: "about", element: <About /> },
//       {
//         path: "orders",
//         element: <Order />,
//         loader: () => {
//           // Redirect to login if the user is not authenticated
//           if (!localStorage.getItem("token")) {
//             return redirect("/login");
//           }
//         },
//       },
//       {
//         path: "carts",
//         element: <Cart />,
//         loader: () => {
//           // Redirect to login if the user is not authenticated
//           if (!localStorage.getItem("token")) {
//             return redirect("/login");
//           }
//         },
//       },
//       { path: "*", element: <Error /> },
//     ],
//   },
//   { path: "/login", element: <Login /> },
//   { path: "/registration", element: <Registration /> },
// ]);

// // Main App component
// const App = () => {
//   return (
//     <AuthProvider>
//       <RouterProvider router={router} />
//     </AuthProvider>
//   );
// };

// export default App;

// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { useState, createContext, useContext } from "react";
// import DefaultLayout from "./components/defaultLayout/defaultLayout";
// import Home from "./page/Home";
// import About from "./page/About";
// import Error from "./page/Error";
// import Login from "./page/Login";
// import Product from "./components/Product";
// import Registration from "./page/Registration";
// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import Order from "./components/Order";
// import Cart from "./components/Cart";
// import axios from "axios";

// // Create Auth Context
// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post("http://localhost:8080/api/users/login", {
//         email,
//         password,
//       });

//       setUser(response.data.user);
//       setIsAuthenticated(true);
//     } catch (error) {
//       console.error("Login failed", error);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Conditional Layout Wrapper
// const DefaultLayoutWrapper = () => {
//   const { isAuthenticated } = useAuth();
//   return (
//     <>
//       {isAuthenticated ? <Navbar /> : <Header />}
//       <DefaultLayout />
//     </>
//   );
// };

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <DefaultLayoutWrapper />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "product", element: <Product /> },
//       { path: "about", element: <About /> },
//       { path: "orders", element: <Order /> },
//       { path: "carts", element: <Cart /> },
//       { path: "*", element: <Error /> },
//     ],
//   },
//   { path: "/login", element: <Login /> },
//   { path: "/registration", element: <Registration /> },
// ]);

// const App = () => {
//   return (
//     <AuthProvider>
//       <RouterProvider router={router} />
//     </AuthProvider>
//   );
// };

// export default App;


// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { useState, createContext, useContext } from "react";
// import DefaultLayout from "./components/defaultLayout/defaultLayout";
// import Home from "./page/Home";
// import About from "./page/About";
// import Error from "./page/Error";
// import Login from "./page/Login";
// import Product from "./components/Product";
// import Registration from "./page/Registration";
// import Header from "./components/Header";
// import Navbar from "./components/Navbar";
// import Order from "./components/Order";
// import Cart from "./components/Cart";

// // Create Auth Context
// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const login = () => setIsAuthenticated(true);
//   const logout = () => setIsAuthenticated(false);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Conditional Layout Wrapper
// const DefaultLayoutWrapper = () => {
//   const { isAuthenticated } = useAuth();
//   return (
//     <>
//       {isAuthenticated ? <Navbar /> : <Header />}
//       <DefaultLayout />
//     </>
//   );
// };

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <DefaultLayoutWrapper />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "product",
//         element: <Product />,
//       },
//       {
//         path: "about",
//         element: <About />,
//       },
//       {
//         path: "orders",
//         element: <Order />,
//       },
//       {
//         path: "carts",
//         element: <Cart />,
//       },
//       {
//         path: "*",
//         element: <Error />,
//       }
      
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/registration",
//     element: <Registration />,
//   },
// ]);

// const App = () => {
//   return (
//     <AuthProvider>
//       <RouterProvider router={router} />
//     </AuthProvider>
//   );
// };

// export default App;

