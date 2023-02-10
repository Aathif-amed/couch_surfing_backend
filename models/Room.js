import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      max: 500,
      default: 0,
    },
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 150,
    },
    description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 1000,
    },
    images: {
      type: [String],
      validate: (value) => Array.isArray(value) && value.length > 0,
    },
    uid: {
      type: String,
      required: true,
    },
    uFname: {
      type: String,
      required: true,
    },
    uLname: {
      type: String,
      default: "",
    },
    uPhoto: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("rooms", roomSchema);

export default Room;
