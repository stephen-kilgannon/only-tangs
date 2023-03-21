var express = require("express");
var router = express.Router();
var event = require("../handlers/event-handler");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Tangs" });
});

router.get("/home", function (req, res, next) {
  res.redirect(req.get('referer'));
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "login" });
});

router.get("/checkin", async function (req, res, next) {
  const body = {
    message: "Tang has checked in",
    type: "Check In",
    user: "6419c4d9076fb852326e106f"
}
  const payload = await event.createEvent(body);
  if (!payload) return res.status(409).send(new Error("unable to create event"));
  if (payload) return res.status(200).send(payload);
});

router.post("/login", async function (req, res, next) {
  const data = await event.getEvent()
  console.log(req.body.username)
  console.log(req.timestamp)
  res.render("home", {
    greeting: `Welcome back ${req.body.username}`,
    lastLogin: '17:10 21-03-2023',
    checkinCount: data.length,
    events: data,
  });
});

module.exports = router;
