var user = require("../handlers/User-handler");

async function logon(username) {
  const validUser = await isUserValid(username);
  if (validUser) {
    // Store the user ID in the session
    req.session.userId = req.body.username;
    req.session.uid = validUser._id;
    return true
  } else {
    return false
  }
}

async function isUserValid(username) {
    const userRecord = await user.getUser(username);
    if (userRecord?._id) {
      return userRecord;
    } else return null;
  }

module.exports = {
  logon
};
