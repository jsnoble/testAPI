var React = require('react');
var CodeStore = require('../stores/CodeStore');
var CodeActions = require('../actions/CodeActions');
var Reflux = require('reflux');

var Structure = React.createClass({

  mixins: [Reflux.ListenerMixin],

  componentDidMount: function(){
    this.listenTo(CodeStore, this.onStructureChange)
},
  //componentDidMount: function(){
  //  this.setState({
  //    structure: CodeStore.getStructure()
  //  })
  //
  //},

  onStructureChange: function(data){
    console.log('got the change', data);
    console.log('get to me pleeeease');

  },

  render: function() {
   // var data = this.state;
    console.log('this is state',this.state);
    return (
      <div className='structure'>

      </div>
    )
  }

});

module.exports = Structure;