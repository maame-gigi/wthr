import React, { createContext, useContext, useState } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  return (
    <WeatherContext.Provider value={{ city, setCity, weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
