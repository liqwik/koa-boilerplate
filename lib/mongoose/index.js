/* eslint-disable no-console */
/**
 * Ref: https://mongoosejs.com/docs/connections.html
 * Learn: https://documentation.progress.com/output/ua/OpenEdge_latest/index.html#page/dmadm%2Fdatabase-buffers.html%23
 * Performance: http://thecodebarbarian.com/slow-trains-in-mongodb-and-nodejs
 */

const mongoose = require('mongoose');
const mongooseIntl = require('./plugins/mongoose-intl');
const options = require('./options');

if (
  process.env.NODE_ENV !== 'production' &&
  process.env.ENABLE_MONGO_DEBUG === 'true'
) {
  // Enable debugging
  mongoose.set('debug', true);
}

/** Enable localization */
mongoose.plugin(mongooseIntl, {
  languages: ['en', 'km', 'zh'],
  defaultLanguage: 'en',
  fallback: true,
});

// Handle initial connection errors
mongoose
  .connect(process.env.DB_CONN, options)
  .then(() => {
    console.log('>> Database connection successful');
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.on('disconnected', () => {
  console.log('>> Database is disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.warn(
      '== Mongoose default connection is disconnected due to application termination =='
    );

    // eslint-disable-next-line no-process-exit
    process.exit(0);
  });
});

module.exports = mongoose;
