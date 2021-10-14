# A Discord Bot buildt using [Discord.js](discord.js.org) and [node.js](nodejs.org)
## To use this bot
Clone this Repository using `git clone https://github.com/gerritwellen/gerritBot.git`
## Before running
### Creating a bot
- [Create an application](https://discord.com/developers/applications/) - optionally set name, description, avatar.
- Select Bot from left navigation and "Add Bot" - set name and icon
- Add bot to your server with the url: https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot

- Copy `config.json.sample` to `config.json` and enter your credentials/tokens/...
## Let's run the bot
### To run locally for development:
- Install dependencies: `npm install`
- Run `npm run deploy` to delopy the SlashCommands
- Start using [nodeon](https://www.npmjs.com/package/nodemon) (automatioc restart) `nodemon index.js`

### To run in production:
- Install dependencies: `npm install --only=production`
- Run `node delpoy-slashCommands.js` to delopy the SlashCommands
- Start: `node index.js`
