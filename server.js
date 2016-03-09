'use strict';

// 1. Make sure the token is loaded in ENV
require('dotenv').load({silent: true});
if (!process.env.TOKEN) {
  console.log('Error: Specify token in environment');
  throw new Error();
}

// 2. Setup Botkit, load data & create a connection
const Botkit = require('botkit');

const queries = require('./modules/queries');
const places = require('./modules/places');

const controller = Botkit.slackbot({debug: false});
const bot = controller.spawn({token: process.env.TOKEN});

bot.startRTM((err, bot, payload) => {
  if (err) throw new Error('Connection to Slack failed');
});

// @Respond_to: queries about where to eat
// @trigger: Mention / Private
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

// @Respond_to: someone is hungry
// @trigger: Ambient
controller.hears('honger', 'ambient',
  (bot, msg) => bot.reply(msg, 'Misschien kan ik helpen vriend?'));

// @Respond_to: get available commands
// @trigger: Mention / Private
controller.hears(['help', '-h', '--help'], 'direct_message,direct_mention,mention', (bot, msg) => {
  bot.startConversation(msg, (err, convo) => {
    convo.say(`Jow mutn, je snapt het duidelijk nie:
- Ik antwoord alleen als je zin de woorden 'wa/waar' en 'eten' bevat.`);
  });
});

// @Respond_to: someone wants to shut down the application
// @trigger: Mention
// @fail_to: trigger needs to be private
controller.hears(['shut down'], 'mention,direct_mention', (bot, msg) => {
  bot.startConversation(msg, (err, convo) => {
    convo.say('Dwaze mutn, je moet me private dm sturen om me offline te halen');
  });
});

// @Respond_to: someone wants to shut down the application
// @trigger: Private
// @success: warns the user about shutting down the application
controller.hears(['shut down'], 'direct_message', (bot, msg) => {
  bot.startConversation(msg, (err, convo) => {
    if (err) throw new Error('The conversation could not be started');

    convo.say('Dit zal de bot offline halen en moet dan manueel worden gerestored op de server');
    convo.ask('Zeker dat je wil doorgaan?', [
      {
        pattern: bot.utterances.yes,
        callback: () => bot.closeRTM()
      },
      {
        pattern: bot.utterances.no,
        callback: (res, convo) => {
          convo.say('Oke dan nie e mutn');
          convo.next();
        }
      }
    ]);
  });
});

// @Respond_to: someone calls out the bot
// @trigger: Mention / Private
controller.hears(['mutn, muttn'], 'mention,direct_mention,direct_message',
  (bot, msg) => bot.reply(msg, 'Wien ister ier de mutn'));
