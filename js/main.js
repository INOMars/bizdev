var mapi = {
  isReady: false,
};

// Maps are ready to use
function initMap() {
  // map to be used
  mapi.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {
      lat: 58,
      lng: 82
    }
  });

  // Geocoder converts address into lat/lon values
  mapi.geocoder = new google.maps.Geocoder();

  // Rock'n'roll
  mapi.isReady = true;
}

