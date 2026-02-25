import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import "./App.css";
import background from "./assets/background.jpg";
/*
 Main App Component
 Handles:
 ✔ Controlled input
 ✔ API fetching
 ✔ Toggle °C / °F
 ✔ Recent searches
 ✔ UI states
*/

export default function App() {
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [unit, setUnit] = useState("metric");
  const [recentCities, setRecentCities] = useState([]);

  const API_KEY = "79f1754942e9d5c4826bc2d62c4d9dd7";

  /* API CALL */
  useEffect(() => {
    if (!searchCity) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=${unit}`
        );

        if (!response.ok) {
          throw new Error("City not found");
        }

        const data = await response.json();
        setWeather(data);

        // Save last 5 searches
        setRecentCities(prev =>
          [...new Set([searchCity, ...prev])].slice(0, 5)
        );

      } catch (err) {
        setError(err.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [searchCity, unit]);

  /* Search handler */
  const handleSearch = () => {
    if (city.trim()) {
      setSearchCity(city);
    }
  };

  /* Toggle interaction */
  const toggleUnit = () => {
    setUnit(prev =>
      prev === "metric" ? "imperial" : "metric"
    );
  };

  return (
 <div
  className="app"
  style={{
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh"
  }}
>

      <h1>🌦 Simple Weather Checker</h1>

      {/* Controlled Input */}
      <div className="search-bar">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city..."
        />

        <button onClick={handleSearch}>
          Search
        </button>

        <button onClick={toggleUnit}>
          {unit === "metric" ? "°F" : "°C"}
        </button>
      </div>

      {/* UI STATES */}
      {!weather && !loading && !error && (
        <p className="empty">
          Start by searching a city 🌍
        </p>
      )}

      {loading && <p>Fetching weather...</p>}

      {error && <p className="error">{error}</p>}

      {weather && (
        <WeatherCard weather={weather} unit={unit} />
      )}

      {/* Recent Searches */}
      <div className="recent">
        <h3>Recent Searches</h3>

        {recentCities.map((city, index) => (
          <button
            key={index}
            onClick={() => setSearchCity(city)}
          >
            {city}
          </button>
        ))}
      </div>

    </div>
  );
}