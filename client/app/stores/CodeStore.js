var Reflux = require('reflux');
var CodeActions = require('../actions/CodeActions');
var ConfigActions = require('../actions/ConfigActions');
var ConfigStore = require('./ConfigStore');
var acorn = require('acorn');
var _ = require('lodash');
var $ = require('jquery');

var CodeStore = Reflux.createStore({

  init: function(){
    this.listenTo(CodeActions.setCode, this.setCode);
    this.listenTo(CodeActions.compareStructure, this.compareStructure);
    this.listenTo(ConfigActions.setRequired, this.setConfig);
    this.listenTo(ConfigActions.setRestrict, this.setConfig);
  },

  _structure : '',

  _messages: [],

  _config:{},

  _comparedStructure: '',

  _AST: null,

  getMessages: function(){
    return this._messages;
  },

  getStructure: function(){
    return this._structure;
  },

  getComparedStructure: function(){
    return this._comparedStructure;
  },

  setConfig: function(){
    this._config = ConfigStore.getConfig();
    this._messages = [];
    this.inspectCode();
  },

  setCode: function(code){
    this._AST = acorn.parse(code);
    this._messages = [];
    this._config = ConfigStore.getConfig();
    this.inspectCode();
    this.setStructure();
  },

  inspectCode : function() {
    var astTree = this._AST;
    var messages = this._messages;

    var mainConfig = this._config;
    var config = _.cloneDeep(mainConfig);

    var required = config.required;
    var restrict = config.restrict;

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

    function recurse(node){
      var nodeType = node.type;
      if(!nodeType){
        return;
      }
      var str = '<li class = '+ nodeType+'>' + nodeType + '</li>';
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

    this._structure = strHtml;
    this.trigger();
  },

  compareStructure: function(data){

    var structure = $(this._structure);
    var isTrue = true;

    function findChild(child, node, bool) {
      if (bool) {
        var parent = $('.' + node).parent().prev();
        var bool = _.some(parent, function (node) {
          return node.innerText === child;
        });
        return bool;
      }
      var child =$('.' + child);
      return child.length >= 1;
    }

    function walkTree(node, parent){
      if(!findChild(node.value, parent)){
        isTrue = false;
        return;
      }
      if(node.children.length > 0){
        for(var i = 0; i < node.children.length; i++){
          walkTree(node.children[i], node.value, true)
        }
      }
    }

    _.each(data, function(tree){
      walkTree(tree, structure)
    });

    this._comparedStructure = isTrue;
    this.trigger();
  }
});

module.exports = CodeStore;
