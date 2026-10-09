// SnowSure public REST resort IDs
const snowSureResorts = {
  copper: "copper-mountain",
  abasin: "arapahoe-basin",
  eldora: "eldora",
  winterpark: "winter-park"
};

// Fetch webcams from SnowSure REST API (no key needed)
async function fetchWebcams(resortId) {
  const url = `https://api.snowsure.com/v1/public/resorts/${resortId}/webcams`;

  const response = await fetch(url);
  if (!response.ok) {
    console.error("SnowSure webcam API error:", response.status);
    return null;
  }

  return await response.json();
}

// Auto-refresh webcam thumbnails
function autoRefreshWebcam(id, url, interval = 60000) {
  const img = document.getElementById(id);
  if (!img) return;

  const refresh = () => {
    img.src = `${url}?t=${Date.now()}`;
  };

  refresh();
  setInterval(refresh, interval);
}

// Render webcams into your dashboard
async function renderWebcams() {
  for (const key of Object.keys(snowSureResorts)) {
    const resortId = snowSureResorts[key];

    try {
      const data = await fetchWebcams(resortId);
      if (!data || !data.webcams || data.webcams.length === 0) continue;

      // Use the first webcam for each resort
      const cam = data.webcams[0];

      const thumb = cam.thumbnail_url;
      const refreshMs = (cam.refresh_interval_seconds || 60) * 1000;

      autoRefreshWebcam(`cam-${key}`, thumb, refreshMs);

    } catch (err) {
      console.error(`Error loading webcams for ${key}:`, err);
    }
  }
}

renderWebcams();
