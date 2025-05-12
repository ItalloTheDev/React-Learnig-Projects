const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

{
  /*console.log("DB_USER:", dbUser);
console.log("DB_PASS:", dbPassword);*/
}

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.tha2vqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );

    console.log("MongoDB connected");
    return dbConn;
  } catch (error) {
    console.log("MongoDB connection error: ", error);
  }
};
conn();

module.exports = conn;
