'use strict';

require('dotenv').load({silent: true});
// TOKEN = xoxb-23836068976-qMOsT1YxlQtqb0AAeblwyUcZ

if (!process.env.token) {
  console.log('Error: Specify token in environment');
  throw new Error();
}

const Botkit = require('botkit');
const os = require('os');

let queries = require('./models/queries');
import {pickOne} from './models/places';

let controller = Botkit.slackbot({
  debug: true
});

let bot = controller.spawn({
  token: process.env.TOKEN
}).startRTM();

controller.hears(queries, 'direct_message,direct_mention,mention', (bot, msg) => {
  bot.api.reactions.add({
    channel: msg.channel
  }, (err, res) => {
    if (err) console.error(err);
  });

  controller.storage.users.get(msg.user, (err, user) => {
    bot.reply(msg, `Ej @${user.name}, wa dacht je van ${pickOne}`);
  });
});
