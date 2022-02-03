const express = require("express");
const router = express.Router();
const Play = require("../models/Play");
const verify = require("../components/verification");
const path = require("path");

//Middleware
router.use(express.static(path.join(__dirname, "../public")));

//Load the Details page
router.get("/:playId", verify, async (req, res) => {
  //Fetch the username of the current user and the current play
  const username = req.cookies;
  const play = await Play.findById(req.params.playId).lean();

  //Check if the current user has already liked the play
  let liked = false;
  for (const key of play.users_liked) {
    if (key === username.user) {
      liked = true;
    }
  }

  //Check if the user is the creator of the play
  let canEdit = false;
  if (play.creator === username.user) {
    canEdit = true;
  }

  //Render the details page with all data
  res.render("theater/theater-details", { username, play, canEdit, liked });
});

//Delete the play
router.get("/delete/:playId", verify, async (req, res) => {
  //Query the database to delete the play
  const shoe = await Play.deleteOne({ _id: req.params.playId });

  //Redirect to home
  res.redirect("/user_home");
});

//Like the play
router.get("/like/:playId", verify, async (req, res) => {
  //Fetch the username
  const username = req.cookies;

  //Add the current user to the list of liked users for that play
  const likeList = await Play.update(
    { _id: req.params.playId },
    {
      $push: {
        users_liked: username.user,
      },
    }
  );

  //Redirect to details page
  res.redirect(`/details/${req.params.playId}`);
});

module.exports = router;
