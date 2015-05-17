var React = require('react');
var data = require('./utils');
var ConfigActions = require('../actions/ConfigActions');
var _ = require('lodash');

var APIForm = React.createClass({

  getInitialState: function() {
    return {
     data
    };
  },

  handleSubmit: function(e){
    e.preventDefault();
    console.log('from submit', this.state)
  },

  render: function() {
    var checks = this.state.data.map(function(d) {
      return (
        <span>
          <input type="checkbox" checked={d.selected} onChange={this.changeSelection.bind(this, d.id)} />
          {d.id}
          <br />
        </span>
      );
    }.bind(this));
    return (
      <form className='form'>
        <div>
          <input type="button"  onClick={this.requireCode} value = {'Required Code'} />

          <input type="button"  onClick={this.restrictCode} value = {'Restrict Code'} />
        </div>
        <br />

        {checks}

      </form>
    );
  },
  changeSelection: function(id) {
    var state = this.state.data.map(function(d) {
      return {
        id: d.id,
        selected: (d.id === id ? !d.selected : d.selected)
      };
    });

    this.setState({ data: state });

  },

  requireCode:function(){
    var requireConfig = {};

    _.each(this.state.data, function(obj){
      if(obj.selected){
        requireConfig[obj.id] = false;
      }
    });

     ConfigActions.setRequired(requireConfig);
  },

  restrictCode:function(){
    var restrictConfig = {};

    _.each(this.state.data, function(obj){
      if(obj.selected){
        restrictConfig[obj.id] = true;
      }
    });

    ConfigActions.setRestrict(restrictConfig);
  }

});

module.exports = APIForm;