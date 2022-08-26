const Agenda = require('agenda');
const { db } = require('config');

const cronJob = new Agenda({ db: { address: db.conn } });

module.exports = cronJob;
