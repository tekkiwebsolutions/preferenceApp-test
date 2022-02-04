const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
     
    });
    // await mongoose.connect("mongodb://localhost:27017/preference-test?ssl=false");
  } catch (error) {
    console.log(error);
    throw Error(error);
    // process.exit(1);
  }
};

module.exports = connectDB;
