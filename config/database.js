module.exports = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '27017',
  user: process.env.DB_USER || 'admin',
  name: process.env.DB_NAME || 'admin',
  password: process.env.DB_PASS || '',
  authSource: process.env.DB_AUTH || 'admin',
  conn: process.env.DB_CONN || '',
};
