// Maps are ready to use
function initMap() {
  console.log('Maps are ready');
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {
      lat: 58,
      lng: 82
    }
  });

}

