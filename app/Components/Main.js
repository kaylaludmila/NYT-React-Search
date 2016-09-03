// Include React 
var React = require('react');

// Here we include all of the sub-components
var Search = require('./Search');
var Save = require('./Save');
var helpers = require('./utils/Helpers.js')
// Here we will utilize the axios library to perform GET/POST requests
var axios = require('axios');

// Create the Parent Component (called Main)
var Main = React.createClass({

	// Here we set a generic state associated with the number of clicks
	getInitialState: function(){
		return {
			searchTerm: "",
			startDate:"",
			endDate:"",
			saveArticle: "",
			articleHistory: [] /*Note how we added in this history state variable*/
		}
	},	

	// This function allows childrens to update the parent.
	setTerm: function(term, start, end){
		this.setState({
			searchTerm: term,
			startDate: start,
			endDate: end,
		})
	},

	getArticleHistory: function(){
		axios.get('/api/save')
			.then(function(response){
				this.setState({
					saveArticle:response.data
				});
			}.bind(this));
	},

	// If the component changes (i.e. if a search is entered)... 
	componentDidUpdate: function(prevProps, prevState){

		if(prevState.searchTerm != this.state.searchTerm){
			console.log("UPDATED");

			// Run the query for the address
			helpers.runQuery(this.state.searchTerm, this.state.startDate, this.state.endDate)
				.then(function(data){
					if (data != this.state.results)
					{
						this.setState({
							results: data
						})

						// After we've received the result... then post the search term to our history. 
						helpers.postHistory(this.state.searchTerm)
							.then(function(data){
								console.log("Updated!");

								// After we've done the post... then get the updated history
								helpers.getHistory()
									.then(function(response){
										console.log("Current History", response.data);
										if (response != this.state.history){
											console.log ("History", response.data);

											this.setState({
												history: response.data
											})
										}
									}.bind(this))	
							}.bind(this)
						)
					}
				}.bind(this))
				
			}
	},

	// The moment the page renders get the History
	componentDidMount: function(){

		// Get the latest history.
		helpers.getHistory()
			.then(function(response){
				if (response != this.state.history){

					this.setState({
						history: response.data
					})
				}
			}.bind(this))
	},


	// Here we render the function
	render: function(){

		return(

			<div className="container">

				<div className="row">

					<div className="jumbotron">
						<h2>New York Times Article Scrubber</h2>
						<hr/>
						<p>Search for an annotate articles of interest!</p>
					</div>


					{/*This represents the "search child"*/}
					<div className="col-md-12">
				
							<div className="panel-heading">
								<h3 className="panel-title text-center">Search</h3>
									<Form setTerm={this.setTerm} />
							</div>
							<div className="panel-heading">
							<h2 className="panel-body text-center">Results</h2>

								<Search searchTerm={this.state.searchTerm} saveArticle={this.saveArticle}/>
							</div>
							<div className="panel-heading">
							<h2 className="panel-body text-center">Saved Articles</h2>
								<Save articleHistory={this.state.articleHistory} />

							</div>
						</div>

					</div>

				</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Main;