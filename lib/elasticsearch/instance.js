const { Client } = require('@elastic/elasticsearch');
const { esConfig } = require('config');

const ElasticSearchIns = new Client({
  node: esConfig.host || '',
});

module.exports = ElasticSearchIns;
