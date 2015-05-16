var Reflux = require("reflux");

var ConfigActions = Reflux.createActions([
  "getConfig",
  "setRequired",
  "setRestrict"
]);

module.exports = ConfigActions;
