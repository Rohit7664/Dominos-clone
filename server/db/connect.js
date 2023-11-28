const mongoose = require("mongoose");
const config = require("../config/index");
mongoose.set("strictQuery", false);

const connect = async () => {
  try {
    const uri =  process.env.DB_CONNECTION_URL || 'mongodb://0.0.0.0:27017';

    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to mongodb");
  } catch (error) {
    console.log("Error in mongoDB connection");
  }
};
module.exports = connect;

