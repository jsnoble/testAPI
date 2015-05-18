var React = require('react');
var CodeActions = require('../actions/CodeActions');
var CodeStore = require('../stores/CodeStore');
var Reflux = require('reflux');

var StructureComparison = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function(){
    return {
      compared: CodeStore.getComparedStructure()
    }
  },

  componentDidMount: function(){
    this.listenTo(CodeStore, this.compareStructure);
  },

  compareStructure: function(){
    this.setState({
      compared: CodeStore.getComparedStructure()
    });
  },

  submit:function(){
    var value =  this.refs.json.getDOMNode().value;
    CodeActions.compareStructure(JSON.parse(value))
  },

  render: function(){
      var compared = "'"+ this.state.compared +"'";
    return (
      <div className='comparison'>
        <textarea ref = 'json' defaultValue = 'Please check the README on how to use this API' >
        </textarea>
        <div>
          <p>The compared code is: {compared}</p>
          <input type="button"  onClick={this.submit} value = {'Submit'} />
        </div>
      </div>
    )}
});


module.exports = StructureComparison;
