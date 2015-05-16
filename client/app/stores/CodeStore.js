var Reflux = require('reflux');
var codeActions = require('../actions/CodeActions');
var acorn = require('acorn');

var codeStore = Reflux.createStore({

    listenables: codeActions,

    _messages: [],

    //need to link a config store and set it here on update
    _config:{},

    _AST: null,

    setCode: function(code){
        this._AST =acorn.parse(code);
        //reset messages
        this._messages = [];
    },

    requireCode : function(array){
        var astTree = this._AST;
        var args;

        //use config and interface to get values, set default in config store
        /*if(array){
          args = array.slice();
          testCode.requireCode.config = array;
        } else {
          args =  testCode.requireCode.config;
        }
*/         //go through keys, true if required , false if restricted
            //change messeage accordinly so only need one function
        var results = _.filter(args, function(nodeType){
            return !acorn.walk.findNodeAt(astTree, null, null, nodeType)
          });

        if(results.length > 0){
         _.each(results, function(nodeType){
             this._messages.push('Make sure to have a '+ nodeType+' in your code');
          });
        }
    }


});

/*
{
    key for existence  value if been visted, loop at end
    required:{type:false},
    restricted: {type: true}

}*/
