const snowSureResorts = {
  copper: "copper-mountain",
  abasin: "arapahoe-basin",
  eldora: "eldora",
  winterpark: "winter-park"
};

async function fetchWebcams(resortId) {
  const url = `https://api.snowsure.com/v1/public/resorts/${resortId}/webcams`;

  const response = await fetch(url);
  if (!response.ok) {
    console.error("SnowSure webcam API error:", response.status);
    return null;
  }

  return await response.json();
}

function autoRefreshWebcam(id, url, interval = 60000) {
  const img = document.getElementById(id);
  if (!img) return;

  const refresh = () => {
    img.src = `${url}?t=${Date.now()}`;
  };

  refresh();
  setInterval(refresh, interval);
}

async function renderWebcams() {
  for (const key of Object.keys(snowSureResorts)) {
    const resortId = snowSureResorts[key];

    try {
      const data = await fetchWebcams(resortId);
      if (!data || !data.webcams || data.webcams.length === 0) continue;

      const cam = data.webcams[0];

      autoRefreshWebcam(`cam-${key}`, cam.thumbnail_url, cam.refresh_interval_seconds * 1000);

      document.getElementById(`camname-${key}`).textContent = cam.name || "Webcam";
      document.getElementById(`camloc-${key}`).textContent = cam.location || "Location unknown";
      document.getElementById(`camupdated-${key}`).textContent =
        "Updated: " + new Date().toLocaleTimeString();

    } catch (err) {
      console.error(`Error loading webcams for ${key}:`, err);
    }
  }
}

renderWebcams();
