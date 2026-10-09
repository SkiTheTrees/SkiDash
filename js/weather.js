const resortCoords = {
  copper: { name: "Copper Mountain", lat: 39.502, lon: -106.151 },
  abasin: { name: "Arapahoe Basin", lat: 39.642, lon: -105.871 },
  eldora: { name: "Eldora", lat: 39.937, lon: -105.582 },
  winterpark: { name: "Winter Park", lat: 39.886, lon: -105.762 }
};

async function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=snowfall_sum,temperature_2m_max,temperature_2m_min&timezone=America/Denver`;
  const res = await fetch(url);
  return res.json();
}

async function renderWeather() {
  const grid = document.getElementById("weather-grid");

  for (const key of Object.keys(resortCoords)) {
    const { name, lat, lon } = resortCoords[key];
    try {
      const data = await fetchWeather(lat, lon);
      const daily = data.daily;

      const card = document.createElement("div");
      card.className = "card-inner";

      const todaySnow = daily.snowfall_sum[0];
      const todayMax = daily.temperature_2m_max[0];
      const todayMin = daily.temperature_2m_min[0];

      card.innerHTML = `
        <h3>${name}</h3>
        <p>Today: ${todayMax}° / ${todayMin}°</p>
        <p>Snow today: ${todaySnow} cm</p>
      `;

      grid.appendChild(card);
    } catch (e) {
      console.error("Weather error for", name, e);
    }
  }
}

renderWeather();

