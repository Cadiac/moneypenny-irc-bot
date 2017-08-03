const bot = require('./bot.js');

if (require.main === module) {
  const ircBot = bot.createClient();
}
