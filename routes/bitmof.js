const express = require('express');

const BitmofModel = require('../models/bitmof.js');

const router = express.Router();

console.log('1');
router.get('/bitmof', (req, res, next) => {
  BitmofModel.find((err, bitmofResults) => {
    if (err) {
      next(err);
      return;
    }
    console.log('2');
    res.render('./bitmof/index.ejs',
  { bitmofObjects: bitmofResults }
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
