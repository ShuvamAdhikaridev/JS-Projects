const weather = document.querySelector(".Weather-Form");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".card");

const apiKey = "2c06e1353f5ea8557ca79b58880e2bcb";

weather.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError();
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  // console.log(response);
  if (!response.ok) {
    throw new Error("Couldn't fetch weather data");
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  console.log(data);
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humiDisplay = document.createElement("p");
  const deskDisplay = document.createElement("p");
  const weatheremoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${temp}`;
  humiDisplay.textContent = `humidity: ${humidity}`;
  deskDisplay.textContent = description;
  weatheremoji.textContent = getWEatherEmoji(id);

  cityDisplay.classList.add("city-Display");
  tempDisplay.classList.add("temp-display");
  humiDisplay.classList.add("humidity-display");
  deskDisplay.classList.add("description-display");
  weatheremoji.classList.add("weather-emoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humiDisplay);
  card.appendChild(deskDisplay);
  card.appendChild(weatheremoji);
}

function getWEatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "🌩";
    case weatherId >= 300 && weatherId < 400:
      return "🌧";
    case weatherId >= 400 && weatherId < 500:
      return "🌨";
    case weatherId >= 500 && weatherId < 600:
      return "🌈";
    case weatherId >= 600 && weatherId < 700:
      return "❄";
    case weatherId >= 700 && weatherId < 800:
      return "🌕";
    default:
      return "?";
  }
}

function displayError(message) {
  const errorDiplay = document.createElement("p");
  errorDiplay.textContent = message;
  errorDiplay.classList.add("error-display");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDiplay);
}
