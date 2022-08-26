const cors = require('./cors');
const headers = require('./headers');
const hpp = require('./hpp');
const { defaultRateLimit, authRateLimit } = require('./rate-limit');

module.exports = {
  cors,
  headers,
  hpp,
  authRateLimit,
  defaultRateLimit,
};
