const logger = require('winston');
const bot = require('./bot.js');

if (require.main === module) {
  logger.info('Starting IRC client');
  const ircBot = bot.createIrcClient();
}
