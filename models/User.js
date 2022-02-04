const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    __v: {
      type: String,
      select: false,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 255,
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
      minLength: 6,
      maxLength: 255,
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 1024,
      select: false,
    },

    image: {
      type: String,
    },

    shortBio: {
      type: String,
    },

    profession: {
      type: String,
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Role",
    },

    favourite: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Preference",
        unique:true
      },
    ],

    dateOfBirth: {
      type: String,
    },

    gender: {
      type: String,
    },

    mobileNo: {
      type: String,
      minLength: 10,
     
    },

    address: {
      type: String,
    },

    lat: {
      type: String,
      required: false,
    },

    lng: {
      type: String,
      required: false,
    },
    distance: {
      type: String,
      required: false,
    },

    city: {
      type: String,
    },
    state: {
      type: String,
    },

    country: {
      type: String,
    },

    zipcode: {
      type: Number,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: Number,
    },

    location: {
      type: String,
    },

    ownerManagerName: {
      type: String,
    },

    ownerManagerMobileNo: {
      type: Number,
      min: 10,
    },

    ownerManagerEmail: {
      type: String,
    },

    ownerManagerTitle: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
