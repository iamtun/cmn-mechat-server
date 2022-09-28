const AppError = require("../utils/appError");
const User = require("../models/user");
const Account = require("../models/account");
const Friend = require("../models/friend");

//OKe
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userID, req.body, {
      new: true,
      runValidators: true,
    });
    const acount = await Account.findByIdAndUpdate(user.accountID, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user || !acount) {
      return next(
        new AppError(404, "fail", "No document found with that id"),
        req,
        res,
        next
      );
    }

    res.status(204).json({
      status: "success",
      data: {
        user,
      }
    });
  } catch (error) {
    next(error);
  }
};
//Oke
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userID, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return next(
        new AppError(404, "fail", "No document found with that id"),
        req,
        res,
        next
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
//Oke
exports.getUserByID = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userID);

    if (!user) {
      return next(
        new AppError(404, "fail", "No document found with that id"),
        req,
        res,
        next
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
//Oke
exports.getUserByPhoneNumber = async (req, res) => {
  try {
    console.log("123"+ req.params.phoneNumber);
    const acount = await Account.find({
      phoneNumber: req.params.phoneNumber
    });
    console.log("123" + acount);
    const user = await User.findOne({ accountID: acount });
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ msg: "Không tồn tại!" });
  }
};
//Oke
exports.getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: "success",
      results: user.length,
      data: {
        data: user,
      },
    });
  } catch (error) {
    next(error);
  }
};
//Chưa test
exports.getListUserSendRequestAddFriendOfMe = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const users = await Friend.find({ userID: userId });

    res.status(200).json({
      data: users,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//Chưa test
exports.acceptAddFriend = async (req, res) => {
    const userId = req.body.userId;
    const friendId = req.params.friendId;
    try {
      const user = await User.findById(userId);
      const friend = await Friend.find({userID:user})


    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
}
