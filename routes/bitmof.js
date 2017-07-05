const express = require('express');

const BitmofModel = require('../models/bitmof.js');

var request = require('request');

const router = express.Router();

console.log('1');

router.get('/bitmof', (req, res, next) => {
  BitmofModel.find((err, bitmofResults) => {
    if (err) {
      next(err);
      return;
    }

    let pricesArray = [];
    request(
      `https://api.coinmarketcap.com/v1/ticker/`,
      (error, response, body) => {
        if (error) {
          console.log('FUCK', error);
          return;
        }

        const coinsFromMarket = JSON.parse(body);
        let pricesArray = [];


        bitmofResults.forEach((coin) => { //loop through all db coins

          coinsFromMarket.forEach((oneCoin) => {

          if (oneCoin.symbol === coin.coinTicker) {

            pricesArray.push(oneCoin.price_usd);

          }
          });
          //API request
        });



        res.render('./bitmof/index.ejs', {
          bitmofObjects: bitmofResults,
          pricesObjects: pricesArray
        });


        // pricesArray.push(body);
        // pricesArray.push(body[0]);
        // pricesArray.push(body.price_usd);

        // console.log(pricesArray);

        // console.log(response);
      }
    );

  });
});



router.get('/bitmof/new', (req, res, next) => {
  res.render('./bitmof/new.ejs');
});

router.post('/bitmof', (req, res, next) => {
  const daBitmof = new BitmofModel({
    coinName: req.body.coinName,
    coinTicker: req.body.coinTicker,
    coinDate: req.body.coinDate,
    coinImage: req.body.coinImage,
    coinFounder: req.body.coinFounder
  });
  daBitmof.save((err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect('/bitmof');
  });
});

module.exports = router;
