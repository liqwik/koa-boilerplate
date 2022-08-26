const admin = require('firebase-admin');
const service = require('service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(service),
});

const FirebaseVerifyCode = {
  check: async (idToken) => {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      return decodedToken;
    } catch (err) {
      throw new Error('ID token is expired');
    }
  },
};

const FirebaseSendNotification = {
  send: async (tokens, notifInfo) => {
    const dataToSend = notifInfo.data || '';

    const message = {
      notification: {
        title: notifInfo.title || '',
        body: notifInfo.body || '',
      },
      data: { data: JSON.stringify(dataToSend) },
      tokens,
    };

    const result = await admin.messaging().sendMulticast(message);

    return result;
  },
};

module.exports = { FirebaseVerifyCode, FirebaseSendNotification };
