
const admin = require("firebase-admin");
var serviceAccount = require("./fahislabs-firebase-adminsdk-py6iu-36eb1c5f42.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fahislabs.firebaseio.com/"
});

module.exports = admin
