var React = require('react');
var CodeStore = require('../stores/CodeStore');
var Reflux = require('reflux');

var Structure = React.createClass({

  mixins: [Reflux.ListenerMixin],

  componentDidMount: function(){
    this.listenTo(CodeStore, this.onStructureChange)
},

  componentWillMount: function(){
    this.setState({
      structure: CodeStore.getStructure()
    })
  },

  onStructureChange: function(){
    this.setState({
      structure: CodeStore.getStructure()
    });
  },

  createMarkup: function() {
    return {__html: this.state.structure};
  },

  render: function() {
    var data = this.state.structure;
    var structure;
    if(data){
      structure = <div dangerouslySetInnerHTML={this.createMarkup()} />
    }
    return (
      <div className='structure'>
        {structure}
      </div>
    )
  }
});

module.exports = Structure;