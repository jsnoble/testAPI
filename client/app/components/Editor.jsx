var React = require('react');
var ace = require('brace');
var _ = require('lodash');
var CodeStore = require('../stores/CodeStore');
var CodeActions = require('../actions/CodeActions');

require('brace/mode/javascript');
require('brace/mode/html');
require('brace/theme/twilight');

var Editor = React.createClass({
    getDefaultProps: function () {
        return {
            mode: 'javascript',
            initialValue: 'function foo (items) {' +'\n'+
            '   var x;' +'\n'+
            '   if(items){' +'\n'+
            '     x = "Hello";' +'\n'+
            '   }' +'\n'+
            '   for(var i = 0; i < 10; i++){' +'\n'+
            '     console.log(x);'+'\n' +
            '   }' +'\n'+
            '  return "I did it!";' +'\n'+
            '}'
        };
    },
    componentDidMount: function () {
        this.editor = ace.edit(this.getDOMNode());
        this.editSession = this.editor.getSession();
        this.editor.$blockScrolling = Infinity;
        this.editor.getSession().setMode('ace/mode/' + this.props.mode);
        this.editor.setTheme('ace/theme/twilight');

        this.editor.setValue(this.props.initialValue);

        CodeActions.setCode(this.editor.getValue());

        this.editor.on('change', _.debounce(function(){
            CodeActions.setCode(this.editor.getValue());
        }, 500).bind(this));
    },

    componentWillUnmount: function () {
        this.editor.destroy();
    },

    render: function () {
        return (
            <div id="ace-editor-wrapper"></div>
        );
    }
});

module.exports = Editor;