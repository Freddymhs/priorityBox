import React, { createContext, useEffect, useState, useCallback } from "react";
import ListService from "./services/ListService";

// Creamos el contexto
const MyContext = createContext(null);

// Creamos el proveedor del contexto
const Provider = ({ children }) => {
  const [boxData, setBoxData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await ListService.getAll();
      setBoxData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetchBoxData = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MyContext.Provider
      value={{ boxData, refetchBoxData, isLoading }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, Provider };
