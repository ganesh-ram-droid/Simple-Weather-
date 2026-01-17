import React, { useState } from "react";

const App = () => {
  const API_KEY = "7908b958f9324ec88fa170631261701";

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      const data = await res.json();

      if (data.error) {
        alert(data.error.message);
        setLoading(false);
        return;
      }

      setWeather(data);
      setCity("")
      setLoading(false);
    } catch {
      alert("Failed to fetch weather data");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center  bg-gradient-to-br from-sky-200 to-indigo-300">
      <div className="bg-white  w-full max-w-md rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Weather Dashboard
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={fetchWeather}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-500">Loading data...</p>
        )}

        {weather && (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">
              {weather.location.name}
            </p>
            <p className="text-sm text-gray-500">
              {weather.location.localtime}
            </p>

            <img
              src={`https:${weather.current.condition.icon}`}
              alt="weather"
              className="mx-auto my-4"
            />

            <p className="text-xl font-bold text-blue-600">
              {weather.current.temp_c}°C
            </p>
            <p className="capitalize text-gray-600">
              {weather.current.condition.text}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-gray-500">Humidity</p>
                <p className="font-semibold">
                  {weather.current.humidity}%
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-gray-500">Wind</p>
                <p className="font-semibold">
                  {weather.current.wind_kph} km/h
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
