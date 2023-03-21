var express = require("express");
var router = express.Router();
var user = require("../handlers/User-handler");

/* GET users listing. */
router.get("/", (req, res) => {
  user.getUser().then((data) => res.json(data));
});

router.post("/", async (req, res) => {
  const payload = await user.createUser(req.body);
  if (!payload) return res.status(409).send(new Error("unable to create user"));
  if (payload) return res.status(200).send(payload);
});

router.patch("/", async (req, res) => {
  const updateUser = await user.updateUser(req.query.id,req.body);
  if (!updateUser) return res.status(409).send(new Error("user updated successfully"));
  if (updateUser) return res.status(204).send(req.body);
});

router.delete("/", async (req, res) => {
  const updateUser = await user.updateUser(req.params.id,req.body);
  if (!updateUser) return res.status(409).send(new Error("user updated successfully"));
  if (updateUser) return res.status(204).send(`user ${updateUser} updated successfully`);
});

router.delete("/ALL", async (req, res) => {
  const removeAll = await user.deleteAll(req.params.id,req.body);
  if (!removeAll) return res.status(409).send(new Error("user updated successfully"));
  if (removeAll) return res.status(204).send(`users deleted: ${removeAll.deletedCount}`);
});


module.exports = router;
