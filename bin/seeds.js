const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bitmof');

const BitmofModel = require('../models/bitmof.js');

const bitmofArray = [
     {
       coinName: ' Bitcoin ',
       coinTicker: 'BTC',
       coinDate: 2009,
       coinImage:'http://logok.org/wp-content/uploads/2016/10/Bitcoin-Logo-640x480.png',
       coinFounder: " Satoshi Nakamoto "
     },
     {
       coinName: ' Ethereum ',
       coinTicker: 'ETH',
       coinDate: 2015,
       coinImage:'https://pbs.twimg.com/profile_images/745670025491648512/fZ7N-rg0.jpg',
       coinFounder: " Vitalik Buterin "

     },
     {
       coinName: ' Ripple ',
       coinTicker: 'XRP',
       coinDate: 2013,
       coinImage:'https://ripple.com/wp-content/uploads/2014/10/mark.png',
       coinFounder: " Chris Larsen & Jed McCaleb "
   },
   {
     coinName: ' Litecoin ',
     coinTicker: 'LTC',
     coinDate: 2011,
     coinImage:'http://ltc.133.io/images/logosizes/ltc800.png',
     coinFounder: " Charlie Lee "
   },
   {
   coinName: ' Ethereum Classic ',
   coinTicker: 'ETC',
   coinDate: 2015,
   coinImage:'https://nanopool.org/icons/etc-logo.png',
   coinFounder: " UNKNOWN",
 },
 {
   coinName: ' Dash ',
   coinTicker: 'DASH',
   coinDate: 2014,
   coinImage:'http://bravenewcoin.com/assets/Coin-Logos/dash.png',
   coinFounder: " Evan Duffield & Kyle Hagan "
 },
 {
   coinName: ' Monero ',
   coinTicker: 'XMR',
   coinDate: 2014,
   coinImage:'https://www.coingecko.com/assets/coin-250/monero-2aac4a400251aebe03ad7f3ad11bb16d.png',
   coinFounder: " Monero Core Team "

 },
 {
   coinName: ' Zcash ',
   coinTicker: 'ZEC',
   coinDate: 2016,
   coinImage:'https://z.cash/theme/images/zcash-logo-gold.png',
   coinFounder: " Zooko Wilcox "
 }
];

BitmofModel.create (
  bitmofArray,
  (err, bitmofResults) => {
    if (err) {
      console.log('ERROR');
      return;
    }
    bitmofResults.forEach((onebitmof) => {
      console.log("New bitmof" + onebitmof.coinName);
      mongoose.disconnect();
    });
  }
);
