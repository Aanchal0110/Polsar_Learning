import React, { createContext, useState, useContext, useEffect } from "react";

// Create the UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [isLogged, setlog] = useState(false);
  const [backendUrl, setUrl] = useState("http://192.168.20.239:3000/");
  const [user, setUser] = useState(() => {
    const storeUser = sessionStorage.getItem("user");
    return storeUser ? JSON.parse(storeUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
    setlog(true);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    setlog(false);
  };

  useEffect(() => {
    const storeUser = sessionStorage.getItem("user");
    if (storeUser) {
      setUser(JSON.parse(storeUser));
      setlog(true);
    }
  }, []);

  const redirect_user = () => {
    if (user) {
      window.location.href = "http://localhost:5173/";
    } else {
      window.location.href = "http://localhost:5173/login";
    }
  };

  return (
    <UserContext.Provider
      value={{ user, login, logout, redirect_user, isLogged, backendUrl }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export default useUser;
