var express = require("express");
var router = express.Router();
var event = require("../handlers/event-handler");
var user = require("../handlers/User-handler");
const loginHandaler = require('../handlers/login-handler')
const registerHandler = reuire('../handlers/register-handler.js')

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Tangs" });
});

router.get("/home", async function (req, res, next) {
  const data = await event.getEvent();
  res.render("home", {
    user: req.session.userId,
    lastLogin: "17:10 21-03-2023",
    checkinCount: data.length,
    events: data,
  });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "login" });
});

router.get("/checkin", async function (req, res, next) {
  const message = `${req.session.userId} has checked in`;
  const type = "Check In";
  createLoginEvent(res, message, type, req.session.uid);
});

router.post("/login", async function (req, res, next) {
  const login = await loginHandaler.logon(req.body.username);
  if (login) {
    res.redirect("/home");
  } else {
    res.render("register");
  }
});

router.post("/register", async function (req, res, next) {
  const validUser = await createUser(req);
  if (validUser) {
    res.redirect("/home");
  } else {
    res.render("register");
  }
});





async function createLoginEvent(res, message, type, uid) {
  const body = {
    message: message,
    type: type,
    user: uid,
  };
  const payload = await event.createEvent(body);
  if (!payload)
    return res.status(409).send(new Error("unable to create event"));
  if (payload) return res.status(200).send(payload);
}

module.exports = router;
