export async function mainHitApiFunc(defaultCity) {
  try {
    // declares a cityName var
    let cityName = document.getElementById("city-name").value;

    // if cityName is empty then by default the city name should be defaultCity which is defined in index.js
    if (cityName === "") {
      cityName = defaultCity;
    }

    // this creates a url with the api key and city name
    let response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=MXXDP52SB6A7WH7SFG252FWT5&contentType=json`,
      { mode: "cors" }
    );

    // a little easter egg
    const easterDiv = document.getElementById("easter-div");

    if (cityName === "kukshi") {
      const easterEgg = document.createElement("h4");
      easterEgg.innerHTML = "Did you mean the worst city in the world?";
      easterDiv.appendChild(easterEgg);
      displayData();
    }

    // after the url is created we run the errorhandler function to check if there is any error in the response
    await errorHandler(response);

    // after the error checking is done we create a var data with response.json() in it
    const data = await response.json();

    // after that we run the displayData func which takes data as arguement
    await displayData(data);

    // if by any means it dosne work we log an error
  } catch (err) {
    console.error("an error occured", err.message);
  }
}

// the error handler function
export async function errorHandler(response) {
  try {
    if (!response.ok) {
      const errortxt = await response.text();
      throw new Error(`${response.status} ${errortxt}`);
    }
  } catch (err) {
    console.log("error", err.message);
    throw err;
  }
}

// class for collecting data
export class dataClass {
  constructor(
    tempFar,
    feelsLikeFar,
    condition,
    currentTime,
    snow,
    cloudCover,
    windSpeed,
    description,
    address,
    fullAddress
  ) {
    this.tempFar = tempFar;
    this.feelsLikeFar = feelsLikeFar;
    this.condition = condition;
    this.currentTime = currentTime;
    this.snow = snow;
    this.cloudCover = cloudCover;
    this.windSpeed = windSpeed;
    this.description = description;
    this.address = address;
    this.fullAddress = fullAddress;
  }

  static toCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
  }
}

// function that displays the data into an object
export async function displayData(data) {
  // getting the temp from data.json()
  const tempFar = data.currentConditions.temp;

  const feelsLikeFar = data.currentConditions.feelslike;

  const condition = data.currentConditions.conditions;

  const currentTime = data.currentConditions.datetime;

  const snow = data.currentConditions.snow;

  const cloudCover = data.currentConditions.cloudcover;

  const windSpeed = data.currentConditions.windspeed;

  const description = data.description;

  const address = data.address;

  const fullAddress = data.resolvedAddress;

  const newDataClass = new dataClass(
    tempFar,
    feelsLikeFar,
    condition,
    currentTime,
    snow,
    cloudCover,
    windSpeed,
    description,
    address,
    fullAddress
  );

  const valueContainer = document.getElementById("value-container");

  const valueDiv = document.createElement("div");
  valueDiv.classList.add("value-div");

  const addressDiv = document.createElement("div");
  addressDiv.classList.add("address-div");

  const addressValue = document.createElement("h1");
  addressValue.innerHTML = newDataClass.address;
  addressValue.classList.add("address-value", "values");
  addressDiv.appendChild(addressValue);
  valueContainer.appendChild(addressDiv);

  const fullAdressValue = document.createElement("h4");
  fullAdressValue.innerHTML = `${newDataClass.fullAddress}`;
  fullAdressValue.classList.add("full-address-value", "values");
  addressDiv.appendChild(fullAdressValue);
  valueContainer.appendChild(addressDiv);

  const currentTimeValue = document.createElement("h2");
  currentTimeValue.innerHTML = `Time: ${newDataClass.currentTime}`;
  currentTimeValue.classList.add("current-time-value", "values");
  valueContainer.appendChild(currentTimeValue);

  let tempValue = document.createElement("h2");
  tempValue.innerHTML = `Temp: ${newDataClass.tempFar}.F`;
  tempValue.classList.add("temp-value", "values");
  valueDiv.appendChild(tempValue);

  const feelsLikeValue = document.createElement("h2");
  feelsLikeValue.innerHTML = `feels like: ${newDataClass.feelsLikeFar}.F`;
  feelsLikeValue.classList.add("feels-like-value", "values");
  valueDiv.appendChild(feelsLikeValue);

  if (snow !== 0) {
    const snowValue = document.createElement("h2");
    snowValue.innerHTML = `Snow: ${newDataClass.snow}`;
    snowValue.classList.add("snow-value", "values");
    valueDiv.appendChild(snowValue);
  }

  const conditionValue = document.createElement("h2");
  conditionValue.innerHTML = `Current Condition: ${newDataClass.condition}`;
  conditionValue.classList.add("condition-value", "values");
  valueDiv.appendChild(conditionValue);

  const descriptionValue = document.createElement("h2");
  descriptionValue.innerHTML = `description: ${newDataClass.description}`;
  descriptionValue.classList.add("description-value", "values");
  valueDiv.appendChild(descriptionValue);

  valueContainer.appendChild(valueDiv);

  document
    .getElementById("temp-toggle")
    .addEventListener("change", function () {
      if (this.checked) {
        // Convert to Celsius and update display
        const tempCelsius = dataClass.toCelsius(newDataClass.tempFar);
        const feelsLikeCelsius = dataClass.toCelsius(newDataClass.feelsLikeFar);
        tempValue.innerHTML = `Temp: ${tempCelsius.toFixed(2)}°C`;
        feelsLikeValue.innerHTML = `Feels Like: ${feelsLikeCelsius.toFixed(
          2
        )}°C`;
      } else {
        // Convert to Fahrenheit and update display
        tempValue.innerHTML = `Temp: ${newDataClass.tempFar}°F`;
        feelsLikeValue.innerHTML = `Feels Like: ${newDataClass.feelsLikeFar}°F`;
      }
    });

  // if any of the arguement is missing we log the error
  if (typeof tempFar === "undefined") console.log("temp is undefined");
  if (typeof feelsLikeFar === "undefined")
    console.log("feelsLike is undefined");
  if (typeof condition === "undefined") console.log("condition is undefined");
  if (typeof currentTime === "undefined")
    console.log("currentTime is undefined");
  if (typeof snow === "undefined") console.log("snow is undefined");
  if (typeof cloudCover === "undefined") console.log("cloudCover is undefined");
  if (typeof windSpeed === "undefined") console.log("windSpeed is undefined");
  if (typeof description === "undefined")
    console.log("description is undefined");
  if (typeof address === "undefined") console.log("address is undefined");
  if (typeof fullAddress === "undefined")
    console.log("fullAddress is undefined");
}
