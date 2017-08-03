const irc = require('irc');
const logger = require('winston');
const ip = require('ip');
const Client = require('ci-client');

const config = require('./config');

class MessageHandler {
  constructor() {
    this.ciClient = this.createCIClient();
    this.ircBot = this.createIrcClient();

    this.handleIrcMessage = this.handleIrcMessage.bind(this);
    this.handleCIMessage = this.this.handleCIMessage.bind(this);

    this.ircBot.addListener('message', this.handleIrcMessage);
    this.ciClient.setReceiver(this.handleCIMessage);
  }

  // IRC
  createIrcClient() {
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
      logger.info('raw:', message);
    });

    ircBot.addListener('error', function (message) {
      logger.error(color('error: ', 'red'), message);
    });

    return ircBot;
  }

  handleIrcMessage(from, to, message) {
    if (to.match(/^[#&]/)) {
      logger.info(`[IRC] from: ${from}, to: ${to}, message: ${message}`);

      this.ciClient.sendMessage(message, { channel: to });
    }
  }

  // Central Intelligence
  createCIClient() {
    const opts = {
      name: config.CI_NAME,
      serverHost: config.CI_SERVER_HOST,
      serverPort: config.CI_SERVER_PORT,
      myHost: ip.address(),
      myPort: config.CI_RECEIVER_PORT,
    };

    logger.info(`Connecting ${config.CI_SERVER_HOST}:${config.CI_SERVER_PORT} as ${config.CI_NAME} with settings`, opts);

    const client = new Client(opts);

    return client;
  }

  handleCIMessage(message, context) {
    logger.info(`[CI] message: ${message}, context: ${context}`);

    this.ircBot.say(context.channel, message);
  };
}

module.exports = MessageHandler;
