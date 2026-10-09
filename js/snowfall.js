const snowSureResorts = {
  copper: "copper-mountain",
  abasin: "arapahoe-basin",
  eldora: "eldora",
  winterpark: "winter-park"
};

async function fetchSnowSure(resortId) {
  const url = `https://api.snowsure.com/v1/public/resorts/${resortId}/snow`;

  const response = await fetch(url);
  if (!response.ok) {
    console.error("SnowSure API error:", response.status);
    return null;
  }

  return await response.json();
}

async function renderSnowfall() {
  for (const key of Object.keys(snowSureResorts)) {
    const resortId = snowSureResorts[key];

    try {
      const data = await fetchSnowSure(resortId);
      if (!data) continue;

      document.getElementById(`snow24-${key}`).textContent = `${data.snowfall_24h} in`;
      document.getElementById(`snow48-${key}`).textContent = `${data.snowfall_48h} in`;
      document.getElementById(`snow72-${key}`).textContent = `${data.snowfall_72h} in`;
      document.getElementById(`snow7-${key}`).textContent = `${data.snowfall_7d} in`;
      document.getElementById(`snowseason-${key}`).textContent = `${data.snowfall_season} in`;

      document.getElementById(`baseupper-${key}`).textContent = `${data.base_depth_upper} in`;
      document.getElementById(`baselower-${key}`).textContent = `${data.base_depth_lower} in`;

    } catch (err) {
      console.error(`Error loading snowfall for ${key}:`, err);
    }
  }
}

renderSnowfall();
