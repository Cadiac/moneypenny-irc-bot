const logger = require('winston');
const MessageHandler = require('./handler.js');

if (require.main === module) {
  logger.info('Starting IRC client');

  const messageHandler = new MessageHandler();
}
