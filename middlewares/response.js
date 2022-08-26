module.exports = async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;

  ctx.set({
    'Last-Modified': Date.now(),
    'X-Response-Time': `${ms}ms`,
  });
};
