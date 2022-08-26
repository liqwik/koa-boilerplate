const { getDeviceInfo } = require('app/utils/http');

module.exports = async (ctx, next) => {
  const acceptsLanguages = ctx.acceptsLanguages('en', 'km', 'zh');

  ctx.state.lang = 'en';
  ctx.state.clientIp = ctx.request.header['x-real-ip'];

  if (ctx.query.lang) {
    ctx.state.lang = ctx.query.lang;
  } else if (ctx.request.header['accept-language'] && acceptsLanguages) {
    ctx.state.lang = acceptsLanguages;
  }

  if (
    ctx.request.header['x-device-id'] &&
    ctx.request.header['x-device-info']
  ) {
    const deviceInfo = getDeviceInfo(ctx.request.header);
    ctx.state.device = deviceInfo;
  }
  return next();
};
