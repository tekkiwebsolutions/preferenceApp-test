const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema(
  {
    __v: {
      type: Number,
      select: false,
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 255,
    },
    addedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Preference", preferenceSchema);