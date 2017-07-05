var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HoldingSchema = new Schema({

  shares: Number,
  marketValue: Number,
  overallReturn: Number,
  overallGain: Number,

});

module.exports = HoldingSchema;
