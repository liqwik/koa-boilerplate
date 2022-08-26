/* eslint-disable */

'use strict';

const defaults = require('lodash/defaults');
const isString = require('lodash/isString');
const isArray = require('lodash/isArray');

const typeis = require('type-is');

/**
 * @public
 * @param {object} options
 * @param {boolean} [options.checkQuery]
 * @param {boolean} [options.checkBody]
 * @param {string} [options.checkBodyOnlyForContentType]
 * @param {string[]|string} [options.whitelist]
 * @return {function}
 */
module.exports = function (options) {
  options = defaults(options || {}, {
    checkQuery: true,
    checkBody: true,
    checkBodyOnlyForContentType: 'urlencoded',
    whitelist: null,
  });

  if (isString(options.whitelist)) {
    options.whitelist = [options.whitelist];
  }

  if (options.whitelist !== null && !isArray(options.whitelist)) {
    console.error(
      '[HPP] ' +
        'Please pass either a string or an array to "options.whitelist". ' +
        'Deactivated the whitelist!'
    );
    options.whitelist = null;
  }

  if (isArray(options.whitelist)) {
    options.whitelist = options.whitelist.filter(function (elem) {
      if (!isString(elem)) {
        console.error(
          '[HPP] ' +
            'Please pass only strings into the "options.whitelist" array. ' +
            'Removed the entry <' +
            elem +
            '>!'
        );

        return false;
      }

      return true;
    });
  }

  /**
   * @private
   * @param {object} req
   * @return {boolean}
   */
  function _correctContentType(req) {
    return typeis(req, options.checkBodyOnlyForContentType);
  }

  /**
   * @private
   * @param {string} keyReqPart e.g 'body' or 'query'
   * @param {string} keyPolluted e.g 'bodyPolluted' or 'queryPolluted'
   * @param {object} req
   */
  function _putAside(keyReqPart, keyPolluted, req) {
    let whitelist = options.whitelist;

    let reqPart = req[keyReqPart];
    let reqPolluted = req[keyPolluted];

    // Put aside only once in case multiple HPP middlewares are used
    if (reqPolluted === undefined) {
      // Check identical to lodash's isUndefined(reqPolluted)

      reqPolluted = req[keyPolluted] = {};

      let parameters = Object.keys(reqPart);

      for (
        let i = 0, parametersLen = parameters.length;
        i < parametersLen;
        i += 1
      ) {
        let paramKey = parameters[i];
        let paramValue = reqPart[paramKey];

        if (!isArray(paramValue)) {
          continue;
        }

        // Put aside
        reqPolluted[paramKey] = paramValue;
        // Select the first parameter value
        reqPart[paramKey] = paramValue[paramValue.length - 1];
      }
    }

    // Processed separately to allow multiple whitelists from multiple HPP middlewares as well as
    // for performance reasons
    if (whitelist !== null) {
      // Validation at top ensures whitelist is either null or an array

      for (
        let k = 0, whitelistLen = whitelist.length;
        k < whitelistLen;
        k += 1
      ) {
        let whitelistedParam = whitelist[k];

        if (reqPolluted[whitelistedParam]) {
          // Put back
          reqPart[whitelistedParam] = reqPolluted[whitelistedParam];
          delete reqPolluted[whitelistedParam];
        }
      }
    }
  }

  /**
   * @public
   * @param {object} ctx
   * @param {function} next
   */
  return function hpp(ctx, next) {
    if (options.checkQuery && ctx.query) {
      _putAside('query', 'queryPolluted', ctx);
    }

    if (
      options.checkBody &&
      ctx.request.body &&
      _correctContentType(ctx.request)
    ) {
      _putAside('body', 'bodyPolluted', ctx.request);
    }

    return next();
  };
};
