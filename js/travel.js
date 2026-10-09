// To use live travel time, you’d call Google Distance Matrix API from a backend
// or a serverless function (to keep your API key secret).
// For now, mock typical times.

const travelTimes = {
  copper: "≈ 1 hr 35 min",
  abasin: "≈ 1 hr 30–35 min",
  eldora: "≈ 55–65 min",
  winterpark: "≈ 1 hr 30–40 min"
};

function renderTravel() {
  document.getElementById("travel-copper").textContent = travelTimes.copper;
  document.getElementById("travel-abasin").textContent = travelTimes.abasin;
  document.getElementById("travel-eldora").textContent = travelTimes.eldora;
  document.getElementById("travel-wp").textContent = travelTimes.winterpark;
}

renderTravel();
