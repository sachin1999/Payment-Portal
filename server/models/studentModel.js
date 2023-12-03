import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  instituteName: {
    type: String,
    required: true,
  },
  form: {
    applicationNo: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    courseSession: {
      type: String,
      required: true,
    },
    courseYear: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
});

export const User = mongoose.model("User", userSchema);
