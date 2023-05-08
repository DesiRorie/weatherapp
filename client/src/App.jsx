import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
function App() {
  const API_Key = "94b9a56ce4b47ecd8337f1ded69fe628";
  const [weatherData, setWeatherData] = useState(null);
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimQuery = query.trim();
    if (trimQuery === "") {
      setErrorMessage("Search cannot be empty");
      return;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_Key}&units=imperial`
    ).then((res) =>
      res.json().then((data) => {
        setWeatherData(data);
      })
    );
  };

  useEffect(() => {
    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_Key}&units=imperial`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
        });
    };

    const handleError = (error) => {
      console.error("Error getting location:", error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <>
      {weatherData ? (
        <>
          <div className="weatherDivContainer">
            <h2>Current Location Weather</h2>
            <div className="weatherDivInfo">
              <p>Location: {weatherData.name}</p>
              <p>Temperature: {Math.round(weatherData.main.temp)}°F</p>
              <p>Weather Condition: {weatherData.weather[0].description}</p>
            </div>
          </div>
          {/* <form onSubmit={handleSubmit} action="">
            <input
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              type="text"
              placeholder="city weather"
            />
            {errorMessage && <p>{errorMessage}</p>}
            <button
              className={query.trim() ? "" : "buttonBad"}
              disabled={!query.trim() || query.trim().length !== query.length}
            >
              Search
            </button>
          </form> */}
        </>
      ) : (
        <p style={{ color: "white" }}>Loading weather data...</p>
      )}
      {weatherData ? <Card /> : null}
    </>
  );
}

export default App;
// import { useState, useEffect } from "react";

// function App() {
//   const API_Key = "94b9a56ce4b47ecd8337f1ded69fe628";
//   const [weatherData, setWeatherData] = useState(null);
//   const [query, setQuery] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_Key}&units=imperial`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setWeatherData(data);
//       })
//       .catch((error) => console.error(error));
//   };

//   useEffect(() => {
//     const handleSuccess = (position) => {
//       const { latitude, longitude } = position.coords;

//       fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_Key}&units=imperial`
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           setWeatherData(data);
//         })
//         .catch((error) => console.error(error));
//     };

//     const handleError = (error) => {
//       console.error("Error getting location:", error);
//     };

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   return (
//     <>
//       {weatherData ? (
//         <div>
//           <h2>Weather Information</h2>
//           <p>Location: {weatherData.name}</p>
//           <p>Temperature: {weatherData.main.temp}°F</p>
//           <p>Weather Condition: {weatherData.weather[0].description}</p>
//         </div>
//       ) : (
//         <p>Loading weather data...</p>
//       )}

//       <form onSubmit={handleSubmit}>
//         <input
//           onChange={(e) => setQuery(e.target.value)}
//           type="text"
//           placeholder="City"
//         />
//         <button type="submit">Search</button>
//       </form>
//     </>
//   );
// }

// export default App;
