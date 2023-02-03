import mongoose from "mongoose";
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅DB Connection Succesfull..!");
  } catch (error) {
    console.log("❌DB Connection Failed..!");
    console.log(error);
  }
};

export default connection;