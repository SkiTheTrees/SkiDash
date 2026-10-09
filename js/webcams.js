const webcamUrls = {
  copper: "https://b16.hdrelay.com/camera/fb469125-f1f3-459f-aeb4-98cb674e395f/snapshot",
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
