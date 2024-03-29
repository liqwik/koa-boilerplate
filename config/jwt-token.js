module.exports = {
  secret: process.env.JWT_SECRET || 'supersecret',
  issuer: process.env.ISSUER || 'auth.koa.com',
  audience: process.env.AUDIENCE || 'aud.koa.com',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'refreshsecret',
  expireTokenIn: process.env.EXPIRE_TOKEN || '15m',
  expiredAdminTokenIn: process.env.EXPIRE_ADMIN_TOKEN || '1h',
  expireRefreshTokenIn: process.env.EXPIRE_REFRESH_TOKEN || '15m',
};
