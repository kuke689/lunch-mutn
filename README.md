# lunch-mutn

![Lunch Mutn Logo](./assets/Group.png)
> Lunch-mutn is your average lunchbot for Slack.

It was 2AM and I wanted to make something new since I wasn't going to sleep any time soon.

Runs in __Node__ (Botkit) on a __Raspberry Pi B+__ (Resin).

![](http://imgur.com/92om0mQ.png)

## Commands

| Pattern/Command | Description | Scope
|--- |---
| `--help, -h, help` | Displays a list of possible commands the bot can receive | Mention, Direct Mention, Private
| _'shut down'_ | When ran outside of Private it points this out to the user mentioning the bot with this command. Otherwise it asks the user for confirmation and terminates the bot using `bot.closeRTM();` | Mention, Direct Mention, Private
| _'honger'_ | Responds with the message if the bot can help. (Somebody is hungry) | Ambient
| _'waar … eten'_<br>_'wa … eten'_ | Picks a random venue from `modules/places.js` and links to it using the Google Maps API. Matches the patterns described in `modules/queries.js` | Mention, Direct Mention, Private

## Roadmap

* Make responses in Markdown possible
* Fix mentioning the user that's querying the bot. Currently it displays the ID of the user, instead of the handle.

### Disclaimer
> RATED R FOR A HAVING A FOULMOUTHED ATTITUDE. Speaking the proud language of West Vlaams.
