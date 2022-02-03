const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 3,
    max: 1024,
  },
  liked: {
    type: Array,
  },
});

module.exports = mongoose.model("User", userSchema);
