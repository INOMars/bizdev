var apiInstance;

// API
var API = function() {
  this.serverUrl = "http://localhost:4567/";
};

// Ping/pong
API.prototype.ping = function(callback) {
  var path = "ping",
      actionUrl = this.serverUrl + path,
      options = {},
      self = this;

  $.ajax({url: actionUrl}).done(function() {
    typeof callback === "function" && callback();
  }).fail(function(){
    console.log('error');
  });
}

// Returns list of regions
API.prototype.getRegions = function(callback) {
  var path = "regions",
      actionUrl = this.serverUrl + path,
      options = {},
      self = this;

  $.getJSON({url: actionUrl}).done(function(data) {
    typeof callback === "function" && callback(data);
  }).fail(function(){
    console.log('error');
  });
}

// Returns list of regions
API.prototype.search = function(callback) {
  var path = "region/" + $('#regionField').val() + "/markets/" + $("#activityField").val(),
      actionUrl = this.serverUrl + path,
      options = {},
      self = this;

  $.getJSON({url: actionUrl}).done(function(data) {
    console.log(data);
    typeof callback === "function" && callback(data);
  }).fail(function(){
    console.log('error');
  });
}

apiInstance = new API();
