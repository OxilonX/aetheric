import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const AuthContext = createContext();

let memoryToken = null;

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const setAuth = useCallback((userData, token) => {
    setUser(userData);
    memoryToken = token;
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/auth/refresh`, {
        withCredentials: true,
      });

      setAuth(res.data.user, res.data.accessToken);
    } catch (err) {
      setAuth(null, null);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL, setAuth]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
    } finally {
      setAuth(null, null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        API_BASE_URL,
        setAuth,
        logout,
        getAccessToken: () => memoryToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
