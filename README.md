# 🌤️ WTHR — A Modern Weather App

A responsive, weather dashboard built with **React + Vite + TailwindCSS**, featuring **real-time weather search**, and **personalized lifestyle recommendations**.  
---

##  Features INCLUDE:

- **Real-Time Search:** Fetch current weather by city name with live OpenWeatherMap API.
- **Smart Dashboard:** Displays temperature, weather description, and rotating ambient quotes before a city is searched.
- **Forecast:** Shows *Now*, *Later*, *Yesterday*, and *Tomorrow* cards dynamically styled by conditions.
- **Lifestyle Recs:** Personalized daily advice based on the weather 
- **Persistent Data:** City and weather info persist across pages using React Context.
- **Adaptive UI:** Fully responsive design for mobile, tablet, and desktop.
- **Animated Transitions:** Smooth motion powered by Framer Motion.

---

##  Tech Stack

| Tech | Purpose |
|------|----------|
|  React (Vite) | Frontend framework |
|  TailwindCSS | Styling system |
|  OpenWeather API | Weather data source |
|  Framer Motion | Animations |
|  React Router | Page navigation |
|  React Context API | Shared weather state |

---

# GETTING IT TO START
npm run dev
Open your browser at http://localhost:5173


# Project Structure
src/
├── assets/
│   └── react.svg
├── components/
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── SearchWeather.jsx
│   └── WeatherCard.jsx
├── context/
│   └── WeatherContext.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Forecast.jsx
│   └── Lifestyle.jsx
├── styles/
│   ├── App.jsx
│   └── index.css
└── main.jsx


#  Core Logic Overview

# WeatherContext.jsx
Holds the global state for:
city
weather
setter functions (setCity, setWeather)
Allows any page (Dashboard, Forecast, Lifestyle) to access shared weather data.

# SearchWeather.jsx
Handles API requests to OpenWeather.
Updates global context via setCity() and setWeather().
Displays loading states, errors, and weather results.

# Dashboard.jsx
Shows greeting.
Displays rotating preview quotes before search.
Shows main weather card when city data exists.
Navigation links to Forecast and Lifestyle pages.

# Forecast.jsx
Displays Now, Later, Yesterday, and Tomorrow sections.
Automatically loads based on the last searched city.
Stylish animated layout responsive to weather type.

# Lifestyle.jsx
Displays personalized mood messages based on current weather.
Updates dynamically when a city is searched on the dashboard.

# Credits
Made with a lot of sighs and youtube helps and chatgpts; curiosity too, and too some late nights.
Created by GLORIA — a chill CS student who just wanted to know if it’ll rain. 
CHEERS TO ALX's Mr. Tuva Alfred.
