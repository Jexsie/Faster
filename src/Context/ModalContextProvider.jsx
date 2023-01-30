import React, { useContext } from "react";

const ModelContext = React.createContext();

export function useModal() {
  return useContext(ModelContext);
}

const ModalContextProvider = ({ children }) => {
  const values = {};
  return (
    <ModelContext.Provider value={values}>{children}</ModelContext.Provider>
  );
};

export default ModalContextProvider;
