const jwt_decode = require("jwt-decode");
const User = require("../models/User");
const Role = require("../models/Role");

const ensureAuth = async (req, res, next) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // if there isn't any token

  try {
    // const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const verified = jwt_decode(token);

    req.user = verified;

    let search_criteria = { _id: req.user._id };
    const userExists = await User.findOne(search_criteria);

    //console.log(req.user.role);
    if (userExists) {
      Role.find(
        {
          _id: {
            $in: userExists.role,
          },
        },
        (err, roles) => {
          if (err) {
            return res.status(401).json({
              error: true,
              message: "Unauthorized!",
            });
          }
          // req.user.role = roles[0].name;

          req.userId = userExists._id.toString();
          req.email = userExists.email.toString();
          req.role = userExists.role.toString();
          return next();
        }
      );
    } else {
      return res.status(401).json({
        error: true,
        message: "Unauthorized!",
      });
    }
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
};

module.exports = {
  ensureAuth,
};
