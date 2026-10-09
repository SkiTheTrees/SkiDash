// TODO: connect to a real ski conditions API.
// For now, just mock some values.

const snowfallData = {
  copper: { daily: "4 in", weekly: "18 in", base: "65 in" },
  abasin: { daily: "6 in", weekly: "22 in", base: "70 in" },
  eldora: { daily: "2 in", weekly: "10 in", base: "50 in" },
  winterpark: { daily: "5 in", weekly: "20 in", base: "60 in" }
};

function renderSnowfall() {
  document.getElementById("snow-copper").textContent = snowfallData.copper.daily;
  document.getElementById("snow7-copper").textContent = snowfallData.copper.weekly;
  document.getElementById("base-copper").textContent = snowfallData.copper.base;

  document.getElementById("snow-abasin").textContent = snowfallData.abasin.daily;
  document.getElementById("snow7-abasin").textContent = snowfallData.abasin.weekly;
  document.getElementById("base-abasin").textContent = snowfallData.abasin.base;

  document.getElementById("snow-eldora").textContent = snowfallData.eldora.daily;
  document.getElementById("snow7-eldora").textContent = snowfallData.eldora.weekly;
  document.getElementById("base-eldora").textContent = snowfallData.eldora.base;

  document.getElementById("snow-wp").textContent = snowfallData.winterpark.daily;
  document.getElementById("snow7-wp").textContent = snowfallData.winterpark.weekly;
  document.getElementById("base-wp").textContent = snowfallData.winterpark.base;
}

renderSnowfall();
