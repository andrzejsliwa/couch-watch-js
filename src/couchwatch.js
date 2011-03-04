$(function() {
  window.couchwatch || (window.couchwatch = {});
  window.couchwatch.enableCouchWatch = function (db_url) {
    function emptyFunction(){}
    _.each(["log", "debug", "info", "warn", "error"], function (method) {
      couchwatch[method] || (couchwatch[method] = emptyFunction);;
      couchwatch[method] = (function() {
        return function(message) {
          $.post(db_url + "/_design/couchwatch/_update/logger", {severity: method, message: message});
        };
      })(couchwatch[method]);
    });
  };
});
