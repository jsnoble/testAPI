var Reflux = require("reflux");

var ConfigActions = Reflux.createActions([
  "setRequired",
  "setRestrict"
]);

module.exports = ConfigActions;
