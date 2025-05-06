// src/context/LoadingContext.jsx
import React, { createContext, useState, useContext } from "react";
import LoaderCube from "../components/LoaderCube";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-white/60">
          <LoaderCube />
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};
