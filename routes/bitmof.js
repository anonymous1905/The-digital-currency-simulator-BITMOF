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

    pricesArray = [];

    bitmofResults.forEach((coin) => { //loop through all db coins

      let coinName = coin.coinName;
    //API request
      request(
    `https://api.coinmarketcap.com/v1/ticker/` + coinName + `/`,
    (error, response, body) => {
        if (error) {
          console.log('FUCK', error);
          return;
        }

        let prices = JSON.parse(body);
        console.log(prices[0].price_usd);

        pricesArray.push('prices');




// pricesArray.push(body);
// pricesArray.push(body[0]);
// pricesArray.push(body.price_usd);

      // console.log(pricesArray);

        // console.log(response);
      }
        );
    });



    res.render('./bitmof/index.ejs',
  { bitmofObjects: bitmofResults, 
  }
);
  });
});

console.log('3');
router.get('/bitmof/new', (req, res, next) => {
  res.render('./bitmof/new.ejs');
});

router.post('/bitmof', (req, res, next) => {
    const daBitmof = new BitmofModel({
      coinName: req.body.coinName,
      coinTicker: req.body.coinTicker,
      coinDate: req.body.coinDate,
      coinImage:req.body.coinImage,
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
