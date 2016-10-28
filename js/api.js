// API
var API = function() {
  this.serverUrl = "http://localhost/";
};

API.prototype.ping = function(callback) {
  var path = "ping",
      actionUrl = this.serverUrl + path,
      options = {},
      self = this;

  $.ajax(url: actionUrl).done(function() {
    typeof callback === "function" && callback();
  }).fail(function(){
    console.log('error');
  });
}

