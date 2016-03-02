'use strict';

let places = {
  'macn': {
    title: 'de Macn',
    location: [50.805754, 3.275098]
  },
  'pauls': {
    title: 'Pauls Boutique',
    location: [50.826789, 3.271590]
  },
  'pizzzahut': {
    title: 'Pizza Hut',
    location: [50.826102, 3.258564]
  }
};

const pickOne = places => {
  // pick random from the places object
  let place = 'de Macn';
  return place;
};

module.exports = {pickOne};
