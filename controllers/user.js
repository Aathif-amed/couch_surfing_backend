import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import tryCatch from "./utlis/tryCatch.js";

export const register = tryCatch(async (req, res) => {
  //regex for testing password whether it contains one Capital letter, Small letter ,digit and a Special Character
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  //regex for testing username whether it contains only alphanumeric characters
  const nameRegex = /^[A-Za-z0-9]*$/;
  //regex for testing valid email
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const { name, email, password } = req.body;
  //regex test and result will be checked using if condition
  const nameResult = nameRegex.test(name);
  if (name.length < 2 || !nameResult) {
    return res.status(400).json({
      success: false,
      message:
        "Username must be 2 or more Characters Long and contains only alphanumeric characters.",
    });
  }
  const emailTestResult = emailRegex.test(email);
  if (!emailTestResult) {
    return res.status(400).json({
      success: false,
      message: "Please Enter Valid E-Mail.",
    });
  }
  const passwordTestResult = passwordRegex.test(password);
  if (password.length < 6 || !passwordTestResult) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be 6 or more Characters Long and contains a Capital letter, a Small letter, a Numeric digit, and a Special Character.",
    });
  }
  //converting email to lowercase in case user typo's
  const emailLowerCase = email.toLowerCase();

  //checking whether user already exists
  const existingUser = await User.findOne({ email: emailLowerCase });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User Already Exists..!",
    });
  }

  //password Hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email: emailLowerCase,
    password: hashedPassword,
  });

  const { _id: id, photoURL } = user;

  const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.status(200).json({
    success: true,
    result: { id, name, email: user.email, photoURL, token },
  });
});
