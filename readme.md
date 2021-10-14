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
- Start useing [nodeon](https://www.npmjs.com/package/nodemon) (automatioc restart) `nodemon index.js`

### To run in production:

#### Run on metal:

- Install dependencies: `npm install --only=production`
- Run `npm run deploy` to delopy the SlashCommands
- Start: `node index.js`

#### Run using Docker:

- Have the repo cloned and config.json filled out
- Build the Container using `docker build -t <your_username>/gerritbot`
- Start the Container using `docker run -d <your_username>/gerritbot --name gerritbot`
