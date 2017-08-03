// Set NODE_ENV to development if not set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const IRC_SERVER_PORT = process.env.IRC_SERVER_PORT || 6667;
const IRC_NICK = process.env.IRC_NICK || 'moneypenny';
const IRC_SERVER = process.env.IRC_SERVER;
const IRC_CHANNELS = process.env.IRC_CHANNELS ? process.env.IRC_CHANNELS.split(',') : [];
const IRC_REAL_NAME = process.env.IRC_REAL_NAME || 'Tammerforce';
const IRC_AUTO_REJOIN = (process.env.IRC_AUTO_REJOIN || 'true') === 'true';
const IRC_AUTO_CONNECT = (process.env.IRC_AUTO_CONNECT || 'true') === 'true';
const IRC_RETRY_COUNT = process.env.IRC_RETRY_COUNT || 10;
const IRC_RETRY_DELAY = process.env.IRC_RETRY_DELAY || 60;
const IRC_FLOOD_PROTECTION = (process.env.IRC_FLOOD_PROTECTION || 'true') === 'true';
const IRC_FLOOD_PROTECTION_DELAY = process.env.IRC_FLOOD_PROTECTION_DELAY || 60;

module.exports = {
  IRC_SERVER_PORT,
  IRC_NICK,
  IRC_SERVER,
  IRC_CHANNELS,
  IRC_REAL_NAME,
  IRC_AUTO_REJOIN,
  IRC_AUTO_CONNECT,
  IRC_RETRY_COUNT,
  IRC_RETRY_DELAY,
  IRC_FLOOD_PROTECTION,
  IRC_FLOOD_PROTECTION_DELAY,
}
