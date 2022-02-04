const router = require("express").Router();

const { ensureAuth } = require("./verifyJwtToken");

const {
  createPreference,
  listPreference,
  addFavouritePreference,
} = require("../controllers/preferenceControllers");

router.post("/createPreference", [ensureAuth], createPreference);
router.get("/listPreference", listPreference); //[ensureAuth],
router.post("/addFavouritePreference", [ensureAuth], addFavouritePreference);

module.exports = router;
