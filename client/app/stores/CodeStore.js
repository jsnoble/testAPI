var Reflux = require('reflux');
var CodeActions = require('../actions/CodeActions');
var ConfigStore = require('./ConfigStore');
var acorn = require('acorn');
var _ = require('lodash');

var CodeStore = Reflux.createStore({

  listenables: CodeActions,

  //init: function(){
  //  // this.listenTo(CodeActions.setCode, this.setCode());
  //  this.listenTo(ConfigStore, this.setConfig());
  //},

  _structure : '',

  _messages: [],

  _config:{},

  _AST: null,

  setStructureVariable: function(data){
    this._structure = data;
  },

  getMessages: function(){
    return this._messages;
  },

  getStructure: function(){
    return this._structure;
  },

  setConfig: function(){
    console.log('config got retrieved');
    this._config = ConfigStore.getConfig();
  },

  setCode: function(code){
    //console.log('i got here', code)
    this._AST = acorn.parse(code);
        //reset messages //might need to listen to this
    this._messages = [];
    this._config = ConfigStore.getConfig();
    this.setStructure();
    this.inspectCode();

  },

  inspectCode : function() {
    var astTree = this._AST;
    var messages = this._messages;

    var mainConfig = this._config;
    var config = _.cloneDeep(mainConfig);

    var required = config.required;
    var restrict = config.restrict;
   // console.log('this is required',required);


    function recurse(node) {
      var nodeType = node.type;
      if (!nodeType) {
        return
      }

      if (required[nodeType] !== undefined) {
        required[nodeType] = true;
      }
      if (restrict[nodeType]) {
        messages.push('So close! Try removing ' + nodeType + ' from your code')
      }
      if (Array.isArray(node.body)) {
        _.each(node.body, function (innerNode) {
          recurse(innerNode);
        });
      } else if (node.consequent) {
        recurse(node.consequent);
      } else if (node.body) {
        recurse(node.body);
      }
    }

    recurse(astTree);

    for (var key in required) {
      if (!required[key]) {
        messages.push('Make sure to have a ' + key + ' in your code')
      }
    }
    this.trigger();

  },

  setStructure: function(){
    var strHtml = '';
    var astTree = this._AST;
   // console.log('ast before',astTree)

    function recurse(node){
      var nodeType = node.type;
      if(!nodeType){
        return;
      }
      var str = '<li>' + nodeType + '</li>';
      strHtml += str;

      if(Array.isArray(node.body)){
        strHtml += '<ul>';
        _.each(node.body,function(innerNode){
          recurse(innerNode);
        });
        strHtml += '</ul>';
      } else if(node.consequent){
        strHtml += '<ul>';
        recurse(node.consequent);
        strHtml += '</ul>';
      } else if(node.body){
        strHtml += '<ul>';
        recurse(node.body);
        strHtml += '</ul>';
      }
    }

    recurse(astTree);

    CodeActions.setStructureVariable(strHtml);
    //console.log('strut',strHtml)
  }

});

module.exports = CodeStore;

/*
{
    key for existence  value if been visted, loop at end
    required:{type:false},
    restricted: {type: true}

}*/
