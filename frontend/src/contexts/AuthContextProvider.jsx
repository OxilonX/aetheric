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
  const setAuth = useCallback((userData, token) => {
    setUser(userData);
    memoryToken = token;
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/users/refresh`, {
        withCredentials: true,
      });

      const { accessToken } = res.data;

      const userRes = await api.get(`${API_BASE_URL}/api/users/check`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setAuth(userRes.data, accessToken);
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
        `${API_BASE_URL}/api/users/logout`,
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
        getAccessToken,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
