const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passwordEncrypt = require("../utils/passwordEncrypt");

//--VALIDATIONS-----------
const { registerValidation, loginValidation } = require("../utils/validation");

const handleValidation = (body, res, func) => {
  const { error } = func(body);
  if (error) {
    return res.status(400).json({
      error: true,
      msg: error.details[0].message,
    });
  }
};

//-----------------------

//---ALL CONTROLLERS------

///------------------------ Register-User------------------------------///

const registerUser = async (req, res) => {
  // Validate data before creating a user
  //   Hash password

  try {
    console.log(req.body);
    handleValidation(req.body, res, registerValidation);

    //   Checking if the user is already in the db

    const emailExist = await User.findOne({
      email: req.body.email,
    });

    const roleExist = await Role.findOne({
      name: req.body.role,
    });
    if (!roleExist) {
      return res.status(400).json({
        error: true,
        msg: "Invalid Role",
      });
    }

    if (emailExist) {
      return res.status(400).json({
        error: true,
        msg: "E-Mail already exists",
      });
    }
    req.body.password = await passwordEncrypt(req.body.password);
    req.body.role = roleExist._id;

    const user = new User(req.body);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User Created",
      data: user,
    });
  } catch (err) {
    console.log({
      err,
    });
    return res.status(400).json({
      error: true,
      msg: err.message,
    });
  }
};

//-----------------------

//-----LOGIN USER-------------

///------------------------ Login User------------------------------///

const loginUser = async (req, res) => {
  // Validate data before creating a user

  try {
    handleValidation(req.body, res, loginValidation);
    //   Checking if the user is already in the db
    const user = await User.findOne({
      email: req.body.email,
    }).select("+password");
    console.log(user);

    //   if (user.isVerfied === false) {
    //     return res.status(400).json({
    //       error: true,
    //       msg: 'User not Verified',
    //       isVerified: false
    //     });
    //   }

    if (user) {
      //   Password check

      const validPass = await bcrypt.compare(req.body.password, user.password);
      console.log("==========================" + validPass);
      if (!validPass) {
        return res.status(400).json({
          error: true,
          msg: "Invalid password",
        });
      }
      //   Create and assign a token
      const token = jwt.sign(
        {
          _id: user._id,
          role: user.role,
        },
        process.env.TOKEN_SECRET
      );
      return res.status(200).json({
        success: true,

        msg: "Loggedin successfuly",
        access_token: token,
      });
    } else {
      return res.status(400).json({
        error: true,
        msg: "User does not Exist",
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: true,
      msg: err.message,
    });
  }
};

//------------------------------

//-----PASSWORD RESET----------

const passwordReset = async (req, res) => {
  try {
    const email = req.body.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    //find user

    const user = await User.findOne({ email: email, _id: req.userId }).select(
      "+password"
    );

    if (user) {
      const validPass = await bcrypt.compare(oldPassword, user.password);
      console.log(validPass);

      if (!validPass) {
        return res.status(400).json({
          error: true,
          message: "Password not correct",
        });
      }
      if (newPassword) {
        user.password = await passwordEncrypt(newPassword);
        await user.save();
        return res.status(200).json({
          error: true,
          message: "Password Changed Successfully",
        });
      }
    } else {
      return res.status(400).json({
        error: true,
        message: "User Doesn't Exist",
      });
    }
  } catch (err) {
    return res.status(200).json({
      error: true,
      message: err.message,
    });
  }
};

//-----------------------------

module.exports = {
  registerUser,
  loginUser,
  passwordReset,
};
