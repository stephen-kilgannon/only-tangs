var express = require("express");
var router = express.Router();
var event = require("../handlers/event-handler");

/* GET events listing. */
router.get("/", (req, res) => {
  event.getEvent().then((data) => res.json(data));
});

router.post("/", async (req, res) => {
  const payload = await event.createEvent(req.body);
  if (!payload) return res.status(409).send(new Error("unable to create event"));
  if (payload) return res.status(200).send(payload);
});

router.patch("/*", async (req, res) => {
    return res.status(404).send(`not allowed for given resource`)
  });


router.delete("/", async (req, res) => {
  const updateEvent = await event.updateEvent(req.params.id,req.body);
  if (!updateEvent) return res.status(409).send(new Error("event updated successfully"));
  if (updateEvent) return res.status(204).send(`event ${updateEvent} updated successfully`);
});

router.delete("/ALL", async (req, res) => {
  const removeAll = await event.deleteAll(req.params.id,req.body);
  if (!removeAll) return res.status(409).send(new Error("event updated successfully"));
  if (removeAll) return res.status(204).send(`events deleted: ${removeAll.deletedCount}`);
});


module.exports = router;
