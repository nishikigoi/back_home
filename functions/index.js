// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const request = require('request');

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.backHome = functions.https.onRequest(async (req, res) => {
  const getTimeString = () => {
    const localTimeOffset = 9 * 60 * 60 * 1000;
    const dt = new Date(+new Date() + (localTimeOffset + 45 * 60 * 1000));
    const hh = dt.getHours().toString();
    const m = dt.getMinutes();
    let mm;
    if (m < 10) {
      mm = '0' + m.toString();
    } else {
      mm = m.toString();
    }
    return hh + ':' + mm;
  };
  const options = {
    uri: 'https://maker.ifttt.com/trigger/back_home/with/key/dncSJ3OPY_i10ZtwJNG68S',
    headers: {
      'Content-type': 'application/json',
    },
    json: {
      'value1': getTimeString()
    }
  };
  request.post(options, function(error, response, body){});
  res.status(200).send('Success');
});
