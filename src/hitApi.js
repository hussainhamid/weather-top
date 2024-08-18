export async function mainHitApiFunc() {
  try {
    const cityName = document.getElementById("city-name").value;

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=MXXDP52SB6A7WH7SFG252FWT5&contentType=json`,
      { mode: "cors" }
    );

    await errorHandler(response);

    if (cityName === "kukshi") {
      console.log(
        "did you mean the worst city in the world? anyways here you go."
      );
    }

    const data = await response.json();
    await displayData(data);
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
class dataClass {
  constructor(
    temp,
    feelsLike,
    condition,
    currentTime,
    snow,
    cloudCover,
    windSpeed,
    description,
    address,
    fullAddress
  ) {
    this.temp = temp;
    this.feelsLike = feelsLike;
    this.condition = condition;
    this.currentTime = currentTime;
    this.snow = snow;
    this.cloudCover = cloudCover;
    this.windSpeed = windSpeed;
    this.description = description;
    this.address = address;
    this.fullAddress = fullAddress;
  }
}

// function that displays the data into an object
export async function displayData(data) {
  // getting the temp from data.json()
  const temp = data.currentConditions.temp;

  const feelsLike = data.currentConditions.feelslike;

  const condition = data.currentConditions.conditions;

  const currentTime = data.currentConditions.datetime;

  const snow = data.currentConditions.snow;

  const cloudCover = data.currentConditions.cloudcover;

  const windSpeed = data.currentConditions.windspeed;

  const description = data.description;

  const address = data.address;

  const fullAddress = data.resolvedAddress;

  const newDataClass = new dataClass(
    temp,
    feelsLike,
    condition,
    currentTime,
    snow,
    cloudCover,
    windSpeed,
    description,
    address,
    fullAddress
  );
  console.log(newDataClass);

  if (typeof temp === "undefined") console.log("temp is undefined");
  if (typeof feelsLike === "undefined") console.log("feelsLike is undefined");
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
