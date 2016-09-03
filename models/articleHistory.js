var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleHistorySchema = new Schema({
  title: {
    type: String,
  },
  date: {
  	type: Date,
  },
  webURL: {
  	type: String,
  },
});

var ArticleHistory = mongoose.model('ArticleHistory', ArticleHistorySchema);
module.exports = ArticleHistory;