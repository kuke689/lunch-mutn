'use strict';

require('dotenv').load({silent: true});

if (!process.env.TOKEN) {
  console.log('Error: Specify token in environment');
  throw new Error();
}

const Botkit = require('botkit');

let queries = require('./modules/queries');
let places = require('./modules/places');

let controller = Botkit.slackbot({
  debug: false
});

let bot = controller.spawn({
  token: process.env.TOKEN
}).startRTM();

controller.hears(queries, 'direct_message,direct_mention,mention', (bot, msg) => {
  console.log(msg.user);

  bot.api.reactions.add({
    channel: msg.channel
  }, (err, res) => console.error(err));

  controller.storage.users.get(msg.user, (err, user) => {
    let place = places.pickOne(places.data);

    bot.reply(msg, `Ej @${user}, wa dacht je van ${place.title}?
https://www.google.com/maps/place/@${place.location}`);
  });
});
