var Reflux = require('reflux');
var ConfigActions = require('../actions/ConfigActions');

var ConfigStore = Reflux.createStore({

  listenables: ConfigActions,

  _config: { required: {IfStatement: false, VariableDeclaration: false, ReturnStatement: false}, restrict:{BreakStatement: true, WithStatement: true} },

  getConfig: function(){
    return this._config;
  },

  setRequired: function(obj){
    this._config.required = obj;
  },

  setRestrict: function(obj){
    this._config.restrict = obj;
  }
});

module.exports = ConfigStore;