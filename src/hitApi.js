// getting the city name
// uncomment later and update the response var
//const cityName = prompt("which city?");

// adding the city name to the url
const response = await fetch(
  `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/sanfrancisco?unitGroup=metric&key=MXXDP52SB6A7WH7SFG252FWT5&contentType=json`,
  { mode: "cors" }
);

//getting the data.json
const data = await response.json();
console.log(data);

// the error handler function
export async function errorHandler() {
  try {
    if (!response.ok) {
      const errortxt = await response.text();
      throw new Error(`${response.status} ${errortxt}`);
    }
  } catch (err) {
    console.log("error", err);
  }
}

// class for collecting data
class dataClass {
  constructor(temp, feelsLike, condition, currentTime, humidity, cloudCover) {
    this.temp = temp;
    this.feelsLike = feelsLike;
    this.condition = condition;
    this.currentTime = currentTime;
    this.humidity = humidity;
    this.cloudCover = cloudCover;
  }
}

// function that displays the data into an object
export async function displayData() {
  // getting the temp from data.json()
  const temp = data.currentConditions.temp;

  // getting the feelsLike
  const feelsLike = data.currentConditions.feelslike;

  const newDataClass = new dataClass(temp, feelsLike);
  console.log(newDataClass);

  if (typeof temp && feelsLike === "undifined") {
    console.log("temprature not found");
  }
}
