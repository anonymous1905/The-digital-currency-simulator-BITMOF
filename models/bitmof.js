const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const myExchange = new Schema({
    coinName: {type: String},
    coinTicker: {type: String},
    coinDate: {type: Number},
    coinImage:{type: String},
    coinFounder:{type: String}
    
});

const BitmofModel = mongoose.model('bitmof', myExchange);

module.exports = BitmofModel;
