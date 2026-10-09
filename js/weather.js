const resortCoords = {
  copper: { name: "Copper Mountain", lat: 39.502, lon: -106.151, elevation_ft: 12313 },
  abasin: { name: "Arapahoe Basin", lat: 39.642, lon: -105.871, elevation_ft: 13050 },
  eldora: { name: "Eldora", lat: 39.937, lon: -105.582, elevation_ft: 10000 },
  winterpark: { name: "Winter Park", lat: 39.886, lon: -105.762, elevation_ft: 12100 }
};

async function fetchWeather(lat, lon) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}` +
    `&longitude=${lon}` +
    `&daily=snowfall_sum,temperature_2m_max,temperature_2m_min,` +
    `sunrise,sunset,wind_speed_10m_max,wind_speed_10m_min` +
    `&temperature_unit=fahrenheit` +
    `&wind_speed_unit=mph` +
    `&timezone=America%2FDenver`;

  const res = await fetch(url);
  return res.json();
}

async function renderWeather() {
  const grid = document.getElementById("weather-grid");

  for (const key of Object.keys(resortCoords)) {
    const { name, lat, lon, elevation_ft } = resortCoords[key];

    try {
      const data = await fetchWeather(lat, lon);
      const daily = data.daily;

      const todaySnow = daily.snowfall_sum[0];
      const todayMax = daily.temperature_2m_max[0];
      const todayMin = daily.temperature_2m_min[0];
      const sunrise = daily.sunrise[0].split("T")[1];
      const sunset = daily.sunset[0].split("T")[1];
      const windMin = daily.wind_speed_10m_min[0];
      const windMax = daily.wind_speed_10m_max[0];

      const card = document.createElement("div");
      card.className = "card-inner";

      card.innerHTML = `
        <h3>${name}</h3>
        <p><strong>Elevation:</strong> ${elevation_ft.toLocaleString()} ft</p>
        <p><strong>High / Low:</strong> ${todayMax}°F / ${todayMin}°F</p>
        <p><strong>Snow Today:</strong> ${todaySnow} in</p>
        <p><strong>Wind:</strong> ${windMin}–${windMax} mph</p>
        <p><strong>Sunrise:</strong> ${sunrise}</p>
        <p><strong>Sunset:</strong> ${sunset}</p>
      `;

      grid.appendChild(card);

    } catch (err) {
      console.error
      
