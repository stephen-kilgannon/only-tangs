var express = require("express");
var router = express.Router();
var event = require("../handlers/event-handler");
var user = require("../handlers/User-handler");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Tangs" });
});

router.get("/home", async function (req, res, next) {
  const data = await event.getEvent()
  res.render("home", {
    user: req.session.userId,
    lastLogin: '17:10 21-03-2023',
    checkinCount: data.length,
    events: data,
  });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "login" });
});

router.get("/checkin", async function (req, res, next) {
  const body = {
    message: `${req.session.userId} has checked in`,
    type: "Check In",
    user: "6419c4d9076fb852326e106f"
}
  const payload = await event.createEvent(body);
  if (!payload) return res.status(409).send(new Error("unable to create event"));
  if (payload) return res.status(200).send(payload);
});

router.post("/login", async function (req, res, next) {
  const validUser = await isUserValid(req.body.username)
  if (validUser) {
    // Store the user ID in the session
    req.session.userId = req.body.username;
    res.redirect('/home')
} else {
  res.render("register")
}
});

router.post("/register", async function (req, res, next) {
  const validUser = await createUser(req)
  if (validUser) {
    // Store the user ID in the session
    req.session.userId = req.body.username;
    res.redirect('/home')
} else {
  res.render("register")
}
});

async function isUserValid(username) {
  const userRecord = await user.getUser(username)
  if(userRecord?._id) {
      return userRecord
  }
 else return null
}

async function createUser(req){
  const body = {
    "username": req.body.username,
    "password": req.body.password,
    "name"    : req.body.name,
  }
  const createUser = await user.createUser(body)
    if(createUser._doc){
      return createUser
    }
}

module.exports = router;
