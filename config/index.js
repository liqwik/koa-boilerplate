require('dotenv').config();

const sessionConfig = require('./session');
const bodyParserConfig = require('./body-parser');
const jwtTokenConfig = require('./jwt-token');
const dbConfig = require('./database');
const cloudinaryConfig = require('./cloudinary');
const mailConfig = require('./mail');
const corsConfig = require('./cors');
const cryptoConfig = require('./crypto');
const nexmoConfig = require('./nexmo');
const rabbitMQConfig = require('./rabbit-mq');
const redisConfig = require('./redis');
const serverConfig = require('./server');
const socialAccount = require('./social-account');
const esConfig = require('./elastic-search');
const agenda = require('./agenda');
const googleMapConfig = require('./goole-map');

module.exports = {
  cryptoConfig,
  esConfig,
  websiteUrl: process.env.WEBSITE_URL || 'http://localhost:3000',
  webAPI: process.env.WEB_API || 'http://localhost:1337',
  apiVersion: process.env.API_VERSION || 'v1',
  appKey: process.env.APP_KEY || 'BgZurR9gmRNC91pigzB8Qg',
  session: sessionConfig || {},
  bodyParserConfig: bodyParserConfig || {},
  jwtToken: jwtTokenConfig,
  server: serverConfig,
  db: dbConfig,
  cloud: cloudinaryConfig,
  redisConfig,
  mail: mailConfig,
  nexmo: nexmoConfig,
  corsOpts: corsConfig,
  rabbitMQ: rabbitMQConfig,
  socialAccount,
  agenda,
  googleMapConfig,
};
