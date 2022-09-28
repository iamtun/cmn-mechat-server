const AppError = require("../utils/appError");
const Friend = require("../models/friend");
const User = require("../models/user");

//Oke
exports.getAllFriendByIDUser = async (req, res, next) => {
    try {
      const friends = await Friend.find({userID:req.params.userID});
      if (!friends) {
        return next(
          new AppError(404, "fail", "No document found with that id"),
          req,
          res,
          next
        );
      }
      res.status(200).json({
        status: "success",
        data: { friends },
      });
    } catch (error) {
      next(error);
    }
};

exports.deleteFriend = async (req, res, next) => {
  try {
    const userDelete = await User.findById({id:req.params.userIDdelete});
    
    if (!userDelete) {
      return next(
        new AppError(404, "fail", "No document found with that id"),
        req,
        res,
        next
      );
    }
    res.status(200).json({
      status: "success",
      data: { userDelete },
    });
  } catch (error) {
    next(error);
  }
};



