var React = require('react');
var Editor = require('./components/Editor.jsx');
var Messages = require('./components/Messages.jsx');
var Structure = require('./components/Structure.jsx');

var Home = React.createClass({
   render: function(){
       return(
       <div>
         <Messages/>
         <Editor/>
         <Structure/>

       </div>
       )
   }

});

React.render(<Home />, document.getElementById('root'));