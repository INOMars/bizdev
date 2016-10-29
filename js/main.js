var mapInstance;

var mapi = function() {
};

// Maps are ready to use
function initMap() {
  // Rock'n'roll
  mapInstance = new mapi();

  // map to be used
  mapInstance.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {
      lat: 58,
      lng: 82
    }
  });

  // Geocoder converts address into lat/lon values
  mapInstance.geocoder = new google.maps.Geocoder();

  apiInstance.getRegions(function (regions) {
    for (var i=0; i < regions.length; i++) {
      $("#regionField").append($('<option>', {
          value: regions[i].code,
          text: regions[i].name
      }));
    }
  });
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

mapi.prototype.displayRegionMarkers = function(region, data) {
  var markers = [];
  var self = this;
    this.geocode(region, function(location, address) {
      var infowindow = new google.maps.InfoWindow({
        content: "Companies: " + data[0].companies_count + 
          "<br>Combined Revenue (Million Rubles): " + data[0].revenue_sum/1000000 +
          "<br>Combined Profit (Million Rubles): " + data[0].profit_sum/1000000
      });

      var mark = new google.maps.Marker({
        position: location,
        title: address,
      });

      google.maps.event.addListener(mark, 'click', function() {
        infowindow.open(map,mark);
      });

      markers.push(mark);

        // Once we finished - display the markers
      var markerCluster = new MarkerClusterer(self.map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
      });
  });
}

// Displays markers with clustering
mapi.prototype.displayMarkers = function(regions) {
  var markers = [];
  var self = this;
  for (var i = 0; i < regions.length; i++) {
    this.geocode(regions[i].name, function(location, address) {
      var mark = new google.maps.Marker({
        position: location,
        title: address,
      });

      markers.push(mark);

      // Once we finished - display the markers
      if (markers.length == regions.length) {
        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(self.map, markers, {
          imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });
      }
    });
  }
}

