import { User } from "../model/userModel.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/sendToken.js";
import ErrorHandler from "../middlewares/errorHandler.js";

export const getAllList = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.json({
      message: "success",
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User already exist", 400));

    const passwordHash = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: passwordHash });

    sendToken(res, user._id, "successfully registered", 201, true, user);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("user not exist", 400));

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched)
      return next(new ErrorHandler("Incorrect email or password!", 400));

    sendToken(res, user._id, `Welcome ${user.name}`);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id, name, email, password } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );

    res.json({
      success: true,
      message: "Updated Successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserInfo = async (req, res, next) => {
    res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      user: req.user,
    });
};

export const logout = async (req, res, next) => {
    res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "logout successfully",
      });
};
