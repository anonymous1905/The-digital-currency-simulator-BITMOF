const express = require('express');

const BitmofModel = require('../models/bitmof.js');

var request = require('request');

const router = express.Router();

let cachedApi;

let theApi;

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

        res.render('bitmof/index.ejs', {
          bitmofObjects: bitmofResults,
          pricesObjects: pricesArray
        });

        let coinsFromMarket = JSON.parse(body);

        cachedApi = coinsFromMarket;

        // let pricesArray = [];


        bitmofResults.forEach((coin) => { //loop through all db coins

          coinsFromMarket.forEach((oneCoin) => {

            if (oneCoin.symbol === coin.coinTicker) {

              pricesArray.push(oneCoin.price_usd);

            }
          });

        });



      }
    );

  });
});



router.get('/bitmof/new', (req, res, next) => {
  res.render('bitmof/new.ejs');
});

router.post('/bitmof/new', (req, res, next) => {
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



// router.get('/bitmof/buy', (req, res, next) => {
//   console.log("you here?");
//   res.render('bitmof/purchase.ejs');
// });
//
// router.post('/bitmof/buy', (req, res, next) => {
//
// let coinAmount = req.body.coinAmount;
// let coinName = req.body.coinName;
//
// // console.log(cachedApi);
//
// cachedApi.forEach(() => {
//
//   if (coin.symbol === coinName){
//     console.log (req.body.coinPrice * req.body.coinAmount);
//   }
//
//   });
// });
// //make post req for /bitmof/buy




// get inputs and save them





// foreach loop through cachedApi
// check if name input = name we have ( req.body.<<NAME VAR>>)
// if it works we want to calculate total by multiplying amount re.body.(name One Coin if same as example above)



router.post('/holdings', (req, res, next) => {
  const daHolding = new HoldingModel({
    shares: req.body.shares,
    marketValue: req.body.marketValue,
    overallReturn: req.body.overallReturn,
    overallGain: req.body.overallGain,
    initialInvestment: req.body.initialInvestment
  });
  daHolding.save((err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect('/bitmof');
  });
});



module.exports = router;
