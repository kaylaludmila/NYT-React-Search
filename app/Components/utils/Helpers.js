// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// NY Times API
var nyTimesAPI = "4398a95f46e14ee38f9e35c1ba77ac93";

// Helper Functions (in this case the only one is runQuery)
var helpers = {

	// This function serves our purpose of running the query to find articles. 
	runQuery: function(articleSearch){

		console.log(articleSearch);

		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nyTimesAPI;
			url += '?' + $.param({  'q': topic, 'begin_date': startDate, 'end_date': endDate});

		return axios.get(queryURL)
			.then(function(response){

				console.log(response);
				return response.data.results[0].formatted;
		})

	},

	// This function hits our own server to retrieve the record of query results
	getHistory: function(){

		return axios.get('/api')
			.then(function(response){

				console.log(response);
				return response;
			});
	},

	// This function posts new searches to our database.
	postHistory: function(articleSearch){

		return axios.post('/api', {articleSearch: articleSearch})
			.then(function(results){

				console.log("Posted to MongoDB");
				return(results);
			})
	}

}


// We export the helpers function 
module.exports = helpers;