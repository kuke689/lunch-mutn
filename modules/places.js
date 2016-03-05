'use strict';

let _ = require('lodash');

let data = require('../assets/places.json');

const pickOne = obj => {
  let place = _.shuffle(obj)[0];
  return place;
};

module.exports = {data, pickOne};
