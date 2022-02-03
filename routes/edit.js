const express = require("express");
const router = express.Router();
const multer = require("multer");
const Play = require("../models/Play");
const update = multer();
const methodOverride = require("method-override");
const verify = require("../components/verification");
const path = require("path");

//Middleware
router.use(express.static(path.join(__dirname, "../public")));
router.use(methodOverride("_method"));

//Edit the play
router.get("/:playId", update.none(), verify, async (req, res) => {
  //Fetch the username of the current user and the current play
  const username = req.cookies;
  const play = await Play.findById(req.params.playId).lean();

  const isPublic = play.is_public;

  console.log(isPublic);

  //Render the edit page with the username and play
  res.render("theater/edit-theater", { username, play, isPublic });
});

//Post the edited content to the Database
router.patch("/:playId", update.none(), verify, async (req, res) => {
  //Fetch the username.
  const username = req.cookies;

  let isPublic = false;
  if (req.body.public === "on") {
    isPublic = true;
  }

  //Set the vars for the play
  const play = {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    is_public: isPublic,
    creator: username.user,
  };

  //Try to edit or show error
  try {
    await Play.update({ _id: req.params.playId }, play);

    //Redirect to details page.
    res.redirect(`/details/${req.params.playId}`);
  } catch (err) {
    console.log(err), res.redirect(`/edit/${req.params.playId}`);
  }
});

module.exports = router;
