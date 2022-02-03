const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const Play = require("../models/Play");
const verify = require("../components/verification");

//Render creation page
router.get("/", verify, (req, res) => {
  const username = req.cookies;
  res.render("theater/create-theater", { username });
});

//Create a new offer.
router.post("/", upload.none(), verify, async (req, res) => {
  //Fetch the username of the current user
  const username = req.cookies;
  let isPublic = false;
  if (req.body.public === "on") {
    isPublic = true;
  }

  //Create a new play
  const play = new Play({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    is_public: isPublic,
    creator: username.user,
  });

  //Save the new play or display an error
  try {
    const savedPlay = await play.save();
    res.redirect("/user_home");
  } catch (err) {
    console.log({ message: err });
    res.redirect("/user_home");
  }
});

//Export the router
module.exports = router;
