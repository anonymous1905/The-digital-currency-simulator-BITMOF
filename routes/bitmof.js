const express = require('express');

const UserModel = require('../models/user-model.js');

const BitmofModel = require('../models/bitmof.js');

var request = require('request');

const router = express.Router();

let cachedApi;

let theApi;

router.get('/bitmof', (req, res, next) => {
  BitmofModel.find({},(err, bitmofResults) => {
    if (err) {
      next(err);
      return;
    }
console.log(bitmofResults);
    let pricesArray = [];
    request(
      `https://api.coinmarketcap.com/v1/ticker/`,
      (error, response, body) => {
        if (error) {
          console.log('FUCK', error);
          next(error);
          return;
        }

        let coinsFromMarket = JSON.parse(body);

        cachedApi = coinsFromMarket;
console.log('');
console.log('coinsFromMarket 🔇🔇🔇🔇🔇🔇🔇------------------------------');
console.log(coinsFromMarket);
console.log(response.statusCode);
console.log('');
        let pricesArray = [];


        bitmofResults.forEach((coin) => { //loop through all db coins

          coinsFromMarket.forEach((oneCoin) => {

            if (oneCoin.symbol === coin.coinTicker) {

              pricesArray.push(oneCoin.price_usd);

            }
          });
          //API request
        });


          console.log('hi');
        res.render('bitmof/index.ejs', {
          bitmofObjects: bitmofResults,
          pricesObjects: pricesArray
        });
      }
    );

  });
});



router.get('/bitmof/new', (req, res, next) => {
  res.render('bitmof/new.ejs');
});

router.post('/bitmof/new', (req, res, next) => {
  console.log('hahahahahahahahaha');
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



router.get('/bitmof/buy', (req, res, next) => {
  console.log("you here?");
  res.render('bitmof/purchase.ejs');
  console.log('lets do it');
});

router.post('/bitmof/buy', (req, res, next) => {

let coinAmount = req.body.coinAmount;
let coinName = req.body.coinName;
let total = coinAmount;
console.log('YOOOO MANNNNN??');
// console.log(cachedApi);
cachedApi.forEach((coin) => {
// console.log(' TOTTI  ');
  if (coin.name === coinName){
   total *= coin.price_usd;
console.log (coin.price_usd *req.body.coinAmount + "USD");
  }
  });
console.log("hellloooo");
  UserModel.findByIdAndUpdate(req.user._id, {
    $set: {balanceAmount: req.user.balanceAmount - total,
      wallet: `${req.body.coinName} for ${req.body.coinAmount}`},
      $push: {wallet:wallet}
     },(err, result) => {
        UserModel.update(

    );
      let balanceAmount = req.user.balanceAmount - total;
      let wallet = req.body.coinName + req.body.coinAmount;
      // let wallet = all the coin names invested in
      res.render('bitmof/portfolio.ejs', {
        total: total,
        balanceAmount: balanceAmount,
        wallet: wallet

      });
    });





});




// router.get('/bitmof/', (req, res, next) =>{
// res.render('bitmof/portfolio.ejs');
// });










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
