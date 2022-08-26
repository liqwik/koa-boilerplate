module.exports = {
  host: process.env.ES_HOST || 'http://localhost:9200',
  user: process.env.ES_USER || '',
  password: process.env.ES_PWD || '',
};
