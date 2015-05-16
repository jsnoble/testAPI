var React = require('react');

var Message = React.createClass({

  propTypes: {
    text : React.PropTypes.string
  },

  render: function(){
    return(
      <li> {this.props.text}</li>
    )
  }
});

module.exports = Message;