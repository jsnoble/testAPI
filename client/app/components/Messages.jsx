var React = require('react');
var Reflux = require('reflux');
var CodeStore = require('../stores/CodeStore');
var Message = require('./Message.jsx');
var _ = require('lodash');

var Messages = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function(){
    return{
      messages: CodeStore.getMessages()
    }
  },
  componentDidMount: function(){
    this.listenTo(CodeStore, this.onMessageChange);
  },

  onMessageChange: function(){
    this.setState({
      messages: CodeStore.getMessages()
    });
  },

  render: function(){
    var messages = _.map(this.state.messages, function(msg){
      return <Message text = {msg} key={Math.random()} />
    });

    return(
      <div className = "messages">
        <div> Messeages goes here</div>
        { messages }
      </div>
    )
  }

});

module.exports = Messages;