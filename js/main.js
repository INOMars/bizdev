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

// Returns lon/lat for a given address
mapi.prototype.geocode = function(address, callback) {
  this.geocoder.geocode({
    'address': address,
  }, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      typeof callback === "function" && callback(results[0].geometry.location, address);
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}

// Displays markers with clustering
mapi.prototype.displayMarkers = function(regions) {
  var markers = [];
  for (var i = 0; i < regions.length; i++) {
    this.geocode(regions[i], function(location, address) {
      var mark = new google.maps.Marker({
        position: location,
        title: address,
      });

      markers.push(mark);

      // Once we finished - display the markers
      if (markers.length == regions.length) {
        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers, {
          imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });
      }
    });
  }
}

