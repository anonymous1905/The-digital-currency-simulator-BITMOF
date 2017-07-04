/**
* models/coins.js
* -
* Stock data model
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoinSchema = new Schema({
  // Full coin name
  name: String,
  // Coin ticker; eg. AAPL
  ticker: String,

});

module.exports = CoinSchema;
