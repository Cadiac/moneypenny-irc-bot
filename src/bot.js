const irc = require('irc');
const logger = require('winston');
const config = require('./config');

const createIrcClient = () => {
  const opts = {
    port: config.IRC_SERVER_PORT,
    channels: config.IRC_CHANNELS,
    realName: config.IRC_REAL_NAME,
    autoRejoin: config.IRC_AUTO_REJOIN,
    autoConnect: config.IRC_AUTO_CONNECT,
    retryCount: config.IRC_RETRY_COUNT,
    retryDelay: config.IRC_RETRY_DELAY,
    floodProtection: config.IRC_FLOOD_PROTECTION,
    floodProtectionDelay: config.IRC_FLOOD_PROTECTION_DELAY
  };

  logger.info(`Connecting ${config.IRC_SERVER} as ${config.IRC_NICK} with settings`, opts);

  const ircBot = new irc.Client(
    config.IRC_SERVER,
    config.IRC_NICK,
    opts
  );

  ircBot.addListener('raw', function (message) {
    console.log('raw: ', message);
  });

  ircBot.addListener('error', function (message) {
    console.log(color('error: ', 'red'), message);
  });

  return ircBot;
}

module.exports = {
  createIrcClient,
}
