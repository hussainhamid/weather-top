import "./styles.css";

import "./hitApi.js";

import { mainHitApiFunc } from "./hitApi.js";
const searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  mainHitApiFunc();
});
