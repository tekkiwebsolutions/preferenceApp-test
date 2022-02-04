const router = require("express").Router();
const { ensureAuth } = require("./verifyJwtToken");

const {
  registerUser,
  loginUser,
  passwordReset,
} = require("../controllers/authControllers");

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/passwordReset", ensureAuth, passwordReset);

module.exports = router;
