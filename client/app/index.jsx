var React = require('react');
var Editor = require('./components/editor.jsx');

var Home = React.createClass({
   render: function(){
       return(
       <div>
            <div>React is working</div>
           <div>
            <Editor/>
            </div>
        </div>

       )
   }

});

React.render(<Home />, document.getElementById('root'));