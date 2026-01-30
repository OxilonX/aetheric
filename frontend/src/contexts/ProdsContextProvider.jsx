import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import api from "@/components/utilityComponents/authorizationTokenHandler";

export const prodsContext = createContext({});

export const ProdsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const getAllProds = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/products/get`);
    setProducts(response.data);
  };

  useEffect(() => {
    getAllProds();
  }, []);

  return (
    <prodsContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </prodsContext.Provider>
  );
};
