'use strict';

//MARK:- Make sure the token is loaded in ENV
require('dotenv').load({silent: true});
if (!process.env.TOKEN) {
  console.log('Error: Specify token in environment');
  throw new Error();
}

//MARK:- Setup Botkit, load data & create a connection
const Botkit = require('botkit');

const queries = require('./modules/queries');
const places = require('./modules/places');

const controller = Botkit.slackbot({debug: false});
const bot = controller.spawn({token: process.env.TOKEN});

bot.startRTM((err, bot, payload) => {
  if (err) throw new Error('Connection to Slack failed');
});

//MARK:- Respond_to: [queries about where to eat]
//MARK:- Trigger: [Mention/Private]
controller.hears(queries, 'direct_message,direct_mention,mention', (bot, msg) => {
  bot.api.reactions.add({
    channel: msg.channel
  }, (err) => console.error(err));

  controller.storage.users.get(msg.user, (err, user) => {
    let place = places.pickOne(places.data);

    bot.reply(msg, `Ej @${msg.user}, wa dacht je van ${place.title}?
https://www.google.com/maps/place/@${place.location}`);
  });
});

//MARK:- Respond_to: [someone is hungry]
//MARK:- Trigger: [Ambient]
controller.hears('honger', 'ambient',
  (bot, msg) => bot.reply(msg, 'Misschien kan ik helpen vriend?'));

//MARK:- Respond_to: [get available commands]
//MARK:- Trigger: [Mention/Private]
controller.hears(['help', '-h', '--help'], 'direct_message,direct_mention,mention', (bot, msg) => {
  bot.startConversation(msg, (err, convo) => {
    convo.say(`Jow mutn, je snapt het duidelijk nie:
- Ik antwoord alleen als je zin de woorden 'wa/waar' en 'eten' bevat.`);
  });
});


//MARK:- Respond_to: [someone calls out the bot]
//MARK:- Trigger: [Mention/Private]
controller.hears(['mutn, muttn'], 'mention,direct_mention,direct_message',
  (bot, msg) => bot.reply(msg, 'Wien ister ier de mutn'));
