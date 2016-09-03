// Include React 
var React = require('react');

// Create the GrandChild Component
var Save = React.createClass({

	// GrandChild has a state that follows the number of clicks
		return(

				<div className="panel-body text-center">

						<p>{this.props.article}</p> 
						<button type="button" className="btn btn-primary" onClick={this.props.saveArticle}>Save</button>
				</div>,

		)
	});


// Export the component back for use in other files
module.exports = Save;
