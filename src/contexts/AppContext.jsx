import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentInput, setCurrentInput] = useState("");
  const [currentData, setCurrentData] = useState({});
  const [currentCity, setCurrentCity] = useState({});
  const [dataFromCoordinatesAPI, setDataFromCoordinatesAPI] = useState({});
  const providerValue = {
    windowWidth,
    currentInput,
    setCurrentInput,
    currentData,
    setCurrentData,
    currentCity,
    setCurrentCity,
    dataFromCoordinatesAPI,
    setDataFromCoordinatesAPI,
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
