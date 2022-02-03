const router = require("express").Router();

//Logout by clearing the cookies.
router.get("/", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("user");

  console.log(`User has been logged out!`);

  res.redirect("/");
});

module.exports = router;
