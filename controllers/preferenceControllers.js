const User = require("../models/User");
const Role = require("../models/Role");
const Preference = require("../models/Preference");

//------ALL CONTROLLERS---------
//------Create Preference-------------

const createPreference = async (req, res) => {
  try {
    var newData = {};
    newData.addedBy = req.userId;
    newData.name = req.body.name.toLowerCase();

    const preferenceExist = await Preference.findOne({ name: newData.name });

    if (preferenceExist) {
      return res.status(400).json({
        error: true,
        message: "Preference already Exists",
      });
    }

    const newPreference = new Preference(newData);
    await newPreference.save();

    return res.status(200).json({
      success: true,
      message: "New Preference Added",
      data: newPreference,
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: err.message,
    });
  }
};

//----------------------------------------

//------LIST PREFERENCES=--------------
const listPreference = async (req, res) => {
  try {
    const allPrefernces = await Preference.find({});

    return res.status(200).json({
      success: true,
      message: "List of All Preferences",
      data: allPrefernces,
    });
  } catch (err) {
    return res.status(200).json({
      error: true,
      message: err.message,
    });
  }
};

//---------------------------------
const addFavouritePreference = async (req, res) => {
  try {
    const favourite = req.body.favourite;

    const userId = req.userId;

    const user = await User.findOne({ _id: userId });
    if (user) {
      if (favourite.length > 0) {
        for (var i = 0; i < favourite.length; i++) {
          if (user.favourite.includes(favourite[i])) {
            console.log("includes");
          } else {
            console.log(" NOT includes");
            user.favourite.push(favourite[i]);
            await user.save();
          }
        }

        return res.status(200).json({
          success: true,
          data: user,
        });
      }
    }
  } catch (err) {}
};

//----------------------------------

module.exports = {
  createPreference,
  listPreference,
  addFavouritePreference,
};
