require('./loaders/global');

const app = require('core/app');

const bodyParser = require('koa-body');
const compose = require('koa-compose');
const passport = require('koa-passport');

const { server, appKey, bodyParserConfig } = require('config');
const {
  Sanitize,
  Request,
  Logger,
  Response,
  Error,
  Locale,
} = require('middlewares');
const { adminRoute, frontendRoute } = require('config/routes');
const { cors, headers, hpp } = require('config/security');
const { apiDoc } = require('config/development');

const appEvent = require('app/events');

require('lib/mongoose');
require('lib/auth/passport');

const middlewareComposes = compose([
  Sanitize,
  Request,
  Logger,
  Locale,
  Response,
  Error,
]);

/** Set signed cookie keys */
app.keys = [appKey];

if (process.env.NODE_ENV !== 'production') {
  // console.log(frontendRoute.stack.map((i) => `${i.methods}: ${i.path}`));
  apiDoc();
}

/** Security */
app.use(cors());
app.use(headers());
app.use(hpp());

/** Parsing the incoming request bodies in a middleware before you handle it */
app.use(bodyParser(bodyParserConfig));

/** Middleware */
app.use(middlewareComposes);

/** Authenticate */
app.use(passport.initialize());
app.use(passport.session());

/** Route */
app.use(frontendRoute.routes());
app.use(frontendRoute.allowedMethods());
app.use(adminRoute.routes());
app.use(adminRoute.allowedMethods());

/** Event Listener */
appEvent(app);

app.listen(server.port, server.host, () => {
  console.log(
    `app running on ${server.host}:${server.port}`,
    `env=${process.env.NODE_ENV}`
  );
});
