'use strict';

let _ = require('lodash');

let data = {
  macn: {
    title: 'de Macn',
    location: [50.805754, 3.275098]
  },
  pauls: {
    title: 'Pauls Boutique',
    location: [50.826789, 3.271590]
  },
  pizzahut: {
    title: 'Pizza Hut',
    location: [50.826102, 3.258564]
  }
};

const pickOne = obj => {
  let place = _.shuffle(obj)[0];
  return place;
};

module.exports = {data, pickOne};
