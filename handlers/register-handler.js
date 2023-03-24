var user = require("../handlers/User-handler");

async function register(username) {
    const validUser = await createUser(req);
    if (validUser) {
      // Store the user ID in the session
      req.session.userId = req.body.username;
      req.session.uid = validUser._id;
  
      res.redirect("/home");
    } else {
      res.render("register");
    }
}

async function createUser(req) {
    const body = {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
    };
    const createUser = await user.createUser(body);
    if (createUser?._doc) {
      return createUser._doc;
    } else return null;
  }

module.exports = {
    register
};
