import React, { useState } from "react";

const Card = () => {
  const API_Key = "94b9a56ce4b47ecd8337f1ded69fe628";
  const [cityList, setCityList] = useState([]);
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
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("City not found");
        }
        return res.json();
      })
      .then((data) => {
        setCityList((prevList) => [...prevList, data]);
        setQuery("");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="weatherDivContainer">
        <h2>Add New Location</h2>
        <form onSubmit={handleSubmit} action="">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
        </form>
      </div>
      {cityList.length > 0 ? (
        <div className="cityList">
          {cityList.map((city, index) => (
            <div key={index} className="cityCard">
              <p>Location: {city.name}</p>
              <p>Temperature: {Math.round(city.main.temp)}°F</p>
              <p>Weather Condition: {city.weather[0].description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div id="noCities">
          <p>No cities added yet.</p>
        </div>
      )}
    </>
  );
};

export default Card;
