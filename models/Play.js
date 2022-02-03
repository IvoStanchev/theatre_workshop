const mongoose = require("mongoose");

const PlaySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  is_public: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  users_liked: {
    type: Array,
  },
  creator: {
    type: String,
  },
});

module.exports = mongoose.model("Play", PlaySchema);
