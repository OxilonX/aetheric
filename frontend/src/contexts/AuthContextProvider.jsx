import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import api from "@/components/utilityComponents/authorizationTokenHandler";

export const AuthContext = createContext();

let memoryToken = null;
export const getAccessToken = () => memoryToken;
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const setAccessToken = useCallback((token) => {
    memoryToken = token;
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/users/logout`,
        {},
        { withCredentials: true },
      );
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  const checkAuth = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/users/refresh`, {
        withCredentials: true,
      });

      const token = res.data.accessToken;
      setAccessToken(token);

      // Get user separately
      const userRes = await api.get(`${API_BASE_URL}/api/users/check`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userRes.data);
    } catch (err) {
      setUser(null);
      setAccessToken(null);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL, setAccessToken]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        setAccessToken,
        loading,
        API_BASE_URL,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
