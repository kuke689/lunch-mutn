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
  },
  domino: {
    title: 'Dominos Pizza',
    location: [50.826456, 3.264140]
  },
  appel: {
    title: 'Frietlounge Appel',
    location: [50.825822, 3.258163]
  },
  pizzaitalia: {
    title: 'Pizza Italia',
    location: [50.825169, 3.259439]
  }
};

const pickOne = obj => {
  let place = _.shuffle(obj)[0];
  return place;
};

module.exports = {data, pickOne};
