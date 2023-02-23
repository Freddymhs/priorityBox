import React, { createContext, useContext, useEffect, useState } from "react";
import { View, Text, Button } from "native-base";
import { getDataFromFirebase } from "./helpers";

// Creamos el contexto
const MyContext = createContext(null);

// Creamos el proveedor del contexto
const Provider = ({ children }) => {
  const [boxData, setBoxData] = useState([]);

  const refetchBoxData = async () => {
    setBoxData(await getDataFromFirebase());
  };

  useEffect(() => {
    (async () => {
      setBoxData(await getDataFromFirebase());
    })();
  }, []);
  return (
    <MyContext.Provider value={{ boxData, setBoxData, refetchBoxData }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, Provider };
