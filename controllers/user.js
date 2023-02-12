import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import tryCatch from "./utlis/tryCatch.js";
import Room from "../models/Room.js";

//register function
export const register = tryCatch(async (req, res) => {
  //regex for username, email and password validation
  const passwordRegex =
    /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.\?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{6,}/g;
  const nameRegex = /^[A-Za-z]*$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const { fName, lName, email, password } = req.body;
  //regex test and result will be checked using if condition
  const fNameResult = nameRegex.test(fName);
  const lNameResult = nameRegex.test(lName);
  if (fName.length < 2 || !fNameResult) {
    return res.status(400).json({
      success: false,
      message:
        "First Name must be 2 or more Characters Long and contains only alphabets.",
    });
  }
  if (!lNameResult) {
    return res.status(400).json({
      success: false,
      message: "Last Name should contains only alphabets.",
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
  //converting email to lowercase incase of any user typo's
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
  //saving user details to DB
  const user = await User.create({
    fName,
    lName,
    email: emailLowerCase,
    password: hashedPassword,
  });

  const { _id: id, photoURL, role, active } = user;
  //creating jwt token for authentication purpose
  const token = jwt.sign(
    { id, fName, lName, photoURL },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  //returning data to user if checks are passed
  return res.status(200).json({
    success: true,
    result: {
      id,
      fName,
      lName,
      email: user.email,
      photoURL,
      token,
      role,
      active,
    },
  });
});
export const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  //converting email to lowercase incase of any user typo's
  const emailLowerCase = email.toLowerCase();

  //checking whether user exists if not returning status 400
  const existingUser = await User.findOne({ email: emailLowerCase });
  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: "Invalid Username or Password..!",
    });
  }

  //to check whether the passwords match with the password stored in DB if not returning status 400
  const verifyPassword = await bcrypt.compare(password, existingUser.password);

  if (!verifyPassword) {
    return res.status(401).json({
      success: false,
      message: "Invalid Username or Password..!",
    });
  }

  const { _id: id, fName, lName, photoURL, role, active } = existingUser;
  if (!active) {
    return res.status(401).json({
      success: false,
      message: "Sorry,This account has been suspended...! Contact Admin.",
    });
  }

  const token = jwt.sign(
    { id, fName, lName, photoURL },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return res.status(200).json({
    success: true,
    result: {
      id,
      fName,
      lName,
      email: emailLowerCase,
      photoURL,
      token,
      role,
      active,
    },
  });
});
export const updateProfile = tryCatch(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });
  const { _id: id, fName, lName, photoURL } = updatedUser;
  //to also update room details when user updates his profile
  await Room.updateMany(
    { uid: id },
    { ufname: fName, uLname: lName, uPhoto: photoURL }
  );

  const token = jwt.sign(
    { id, fName, lName, photoURL },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return res.status(200).json({
    success: true,
    result: { fName, lName, photoURL, token },
  });
});
export const getUsers = tryCatch(async (req, res) => {
  const users = await User.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: users });
});
export const updateStatus = tryCatch(async (req, res) => {
  const { role, active } = req.body;
  await User.findByIdAndUpdate(req.params.userId, { role, active });
  res.status(200).json({ success: true, result: { _id: req.params.userId } });
});
export const deleteUser = tryCatch(async (req, res) => {
  const { _id } = await User.findByIdAndDelete(req.params.userId);
  res.status(200).json({ success: true, result: { _id } });
});
