const router = require("express").Router();
const verify = require("../components/verification");
const Play = require("../models/Play");
const {} = require("../");

router.get("/", verify, async (req, res) => {
  const username = req.cookies;
  try {
    let plays = await Play.find().lean();

    plays.sort((a, b) => {
      return b.users_liked.length - a.users_liked.length;
    });

    res.render("home/user-home", { plays, username });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
