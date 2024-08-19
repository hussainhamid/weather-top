import "./styles.css";

import "./hitApi.js";

import { displayData, mainHitApiFunc } from "./hitApi.js";
const searchBtn = document.getElementById("search");
const valueContainer = document.getElementById("value-container");

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  mainHitApiFunc();
  valueContainer.innerHTML = "";
});

window.addEventListener("load", () => {
  mainHitApiFunc("san francisco");
});
