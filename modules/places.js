const _shuffle = require('lodash.shuffle');
const data = require('../assets/places.json');

const pickOne = obj => {
  let place = _shuffle(obj)[0];
  return place;
};

module.exports = {data, pickOne};
