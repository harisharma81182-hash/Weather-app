/* Weather Card Component */

const weatherEmoji = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Snow: "❄️",
  Thunderstorm: "⛈️",
  Mist: "🌫️",
};

export default function WeatherCard({ weather, unit }) {

  const condition = weather.weather[0].main;
  const tempUnit = unit === "metric" ? "°C" : "°F";

  return (
    <div className="weather-card">

      <h2>
        {weather.name}, {weather.sys.country}
      </h2>

      <div className="emoji">
        {weatherEmoji[condition] || "🌍"}
      </div>

      <h1>
        {Math.round(weather.main.temp)}
        {tempUnit}
      </h1>

      <p>{condition}</p>

      {/* API Icon */}
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />

      <div className="details">
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>

    </div>
  );
}