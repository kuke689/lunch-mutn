'use strict';

// 1. Make sure the token is loaded in ENV
require('dotenv').load({silent: true});

if (!process.env.TOKEN) {
  console.log('Error: Specify token in environment');
  throw new Error();
}

// 2. Setup Botkit, load data & create a connection
const Botkit = require('botkit');

let queries = require('./modules/queries');
let places = require('./modules/places');

let controller = Botkit.slackbot({debug: false});
let bot = controller.spawn({token: process.env.TOKEN});

bot.startRTM((err, bot, payload) => {
  if (err) throw new Error('Connection to Slack failed');
});

// 3. Respond to message-patterns
controller.hears(queries, 'direct_message,direct_mention,mention', (bot, msg) => {
  bot.api.reactions.add({
    channel: msg.channel
  }, (err, res) => console.error(err));

  controller.storage.users.get(msg.user, (err, user) => {
    let place = places.pickOne(places.data);

    bot.reply(msg, `Ej @${msg.user}, wa dacht je van ${place.title}?
https://www.google.com/maps/place/@${place.location}`);
  });
});

controller.hears('honger', 'ambient', (bot, msg) => bot.reply(msg, 'Misschien kan ik helpen vriend?'));

// 4. Provide feedback or shut down the bot
controller.hears(['help', '-h', '--help'], 'direct_message,direct_mention,mention', (bot, msg) => {
  bot.startConversation(msg, (err, convo) => {
    convo.say(`Jow mutn, je snapt het duidelijk nie:
- Ik antwoord alleen als je zin de woorden 'wa/waar' en 'eten' bevat.
- Je kan me mn bek doen houden door me private te dm'en met het bericht 'shut down'`);
  });
});

controller.hears(['shut down'], 'mention,direct_mention', (bot, msg) => {
  bot.startConversation(msg, (err, convo) => {
    convo.say('Dwaze mutn, je moet me private dm sturen om me offline te halen');
  });
});

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
