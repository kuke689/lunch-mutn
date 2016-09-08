# lunch-mutn
![Lunch Mutn Logo](./assets/Group.png)
> Lunch-mutn is your average lunchbot for Slack.

It was 2AM and I wanted to make something new since I wasn't going to sleep any time soon.

Runs on __Node__ (Botkit) & a __Raspberry Pi B+__ (Resin).

![Imgur](http://i.imgur.com/hozZGWe.png)

## Commands
| Pattern/Command | Description | Scope
|--- |--- |---
| `--help, -h, help` | Displays a list of possible commands the bot can receive | Mention, Direct Mention, Private
| _'honger'_ | Responds with the message if the bot can help. (Somebody is hungry) | Ambient
| _'waar … eten'_<br>_'wa … eten'_ | Picks a random venue from `modules/places.js` and links to it using the Google Maps API. Matches the patterns described in `modules/queries.js` | Mention, Direct Mention, Private

## Contributing
Currently accepting contributions for places in Kortrijk trough PR's.
Fork this repo, create a new branch (or work on master) and edit your place in `assets/places.json`, submit a PR afterwards.

## Roadmap
* Fix mentioning the user that's querying the bot. Currently it displays the ID of the user, instead of the handle.
* Integrate button replies to cycle trough responses.

### Disclaimer
> RATED R FOR A HAVING A FOULMOUTHED ATTITUDE. Speaking the proud language of West-Vlaams.
