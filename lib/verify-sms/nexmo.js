const Nexmo = require('nexmo');
const config = require('config');

const nexmo = new Nexmo({
  apiKey: config.nexmo.apiKey,
  apiSecret: config.nexmo.apiSecret,
});

const verifyPhone = {
  request: (number) =>
    new Promise((resolve, reject) => {
      nexmo.verify.request(
        {
          number,
          brand: 'KoaJS',
          code_length: '4',
          pin_expiry: 60,
        },
        (err, result) => {
          if (err) return reject(err);

          return resolve(result);
        }
      );
    }),

  check: (requestId, code) =>
    new Promise((resolve, reject) => {
      nexmo.verify.check(
        {
          code,
          request_id: requestId,
        },
        (err, result) => {
          if (err) return reject(err);

          return resolve(result);
        }
      );
    }),

  checkStatus: (requestId) =>
    new Promise((resolve, reject) => {
      nexmo.verify.search(requestId, (err, result) => {
        if (err) return reject(err);

        return resolve(result);
      });
    }),

  control: (requestId) =>
    new Promise((resolve, reject) => {
      nexmo.verify.control(
        {
          request_id: requestId,
          cmd: 'cancel',
        },
        (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        }
      );
    }),
};

module.exports = verifyPhone;
