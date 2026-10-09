const webcamUrls = {
  copper: "https://www.coppercolorado.com/sites/default/files/2020-11/Copper-Mountain-Webcam.jpg",
  abasin: "https://www.arapahoebasin.com/globalassets/webcams/webcam-lenawee.jpg",
  eldora: "https://eldora.com/sites/default/files/2020-12/Eldora-Webcam.jpg",
  winterpark: "https://www.winterparkresort.com/-/media/winter-park/webcams/panoramic.ashx"
};

function autoRefreshWebcam(id, url) {
  const img = document.getElementById(id);
  if (!img) return;

  const refresh = () => {
    img.src = `${url}?t=${Date.now()}`;
  };

  refresh();
  setInterval(refresh, 60000); // every 60s
}

autoRefreshWebcam("cam-copper", webcamUrls.copper);
autoRefreshWebcam("cam-abasin", webcamUrls.abasin);
autoRefreshWebcam("cam-eldora", webcamUrls.eldora);
autoRefreshWebcam("cam-winterpark", webcamUrls.winterpark);
