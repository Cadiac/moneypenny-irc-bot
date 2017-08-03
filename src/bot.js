const irc = require('irc');
const config = require('./config');

const createIrcClient = () => {
  const ircBot = new irc.Client(
    config.IRC_SERVER,
    config.IRC_NICK,
    {
      channels: config.IRC_CHANNELS,
      realName: config.IRC_REAL_NAME,
      port: config.PORT,
      password: config.IRC_PASSWORD,
      autoRejoin: config.IRC_AUTO_REJOIN,
      autoConnect: config.IRC_AUTO_CONNECT,
      retryCount: config.IRC_RETRY_COUNT,
      retryDelay: settings.IRC_RETRY_DELAY,
      floodProtection: settings.IRC_FLOOD_PROTECTION,
      floodProtectionDelay: settings.IRC_FLOOD_PROTECTION_DELAY
    }
  );

  ircBot.addListener('raw', function (message) {
    console.log('raw: ', message);
  });

  ircBot.addListener('error', function (message) {
    console.log(color('error: ', 'red'), message);
  });

  return ircBot;
}

