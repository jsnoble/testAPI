var React = require('react');
var Editor = require('./components/Editor.jsx');
var Messages = require('./components/Messages.jsx');
var Structure = require('./components/Structure.jsx');
var APIForm = require('./components/APIForm.jsx');
var StructureComparison = require('./components/StructureComparison.jsx');
var Home = React.createClass({
   render: function(){
       return(
       <div>
         <Messages/>
         <Editor/>
         <Structure/>
          <APIForm/>
         <StructureComparison />
       </div>
       )
   }

});

React.render(<Home />, document.getElementById('root'));