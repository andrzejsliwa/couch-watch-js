$(function() {
  window.console || (window.console = {});
  window.console.enableCouchWatch = function (db_url) {
    function emptyFunction(){}
    _.each(["log", "debug", "info", "warn", "error"], function (method) {
      console[method] || (console[method] = emptyFunction);
      console["old_" + method] = console[method];
      console[method] = (function() {
        return function(message) {
          $.post(db_url + "/_design/couchwatch/_update/logger", {severity: method, message: message});
          console["old_" + method](message);
        };
      })(console[method]);
    });
  };
});