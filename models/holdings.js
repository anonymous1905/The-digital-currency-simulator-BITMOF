var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myholdingSchema = new Schema({

  shares: Number,
  marketValue: Number,
  overallReturn: Number,
  overallGain: Number,
  initialInvestment:Number

});

const HoldingModel =  mongoose.model('amounts', myholdingSchema );

module.exports = HoldingModel;
