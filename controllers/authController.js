const jwt = require("jsonwebtoken");
const Account = require("../models/account");
const User = require("../models/user");
const AppError = require("../utils/appError");

//OKe
const createToken = (_id) => {
  return jwt.sign(
    {
      _id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};
//OKe
exports.login = async (req, res, next) => {
  try {
    const { phoneNumber, passWord } = req.body;
    if (!phoneNumber || !passWord) {
      return next(
        new AppError(401, "fail", "Please provide numberPhone or passWord"),
        req,
        res,
        next
      );
    }

    const _account = await Account.findOne({
      phoneNumber: phoneNumber,
    });

    if (
      !_account ||
      !(await _account.correctPassword(passWord, _account.passWord))
    ) {
      return next(
        new AppError(402, "fail","NumberPhone or Password is wrong"),
        req,
        res,
        next
      );
    }
    
    const _token = createToken(_account.id);
    _account.passWord = undefined;

    let _userLogin = await User.find({accountID:_account})
    res.status(200).json({
      status: "success",
      _token,
      data: {
        _account,
      },
    });
  } catch (err) {
    next(err);
  }
};
//Oke
exports.signup = async (req, res, next) => {
  try {
    const {phoneNumber,passWord,fullName,gender,confirmPassWord} = req.body
    const _accountFind = await Account.findOne({
      phoneNumber:phoneNumber
    })
    console.log(_accountFind);
    if(_accountFind!=null)
    {
      return next(
        new AppError(403, "fail","Phone number already exists "),
        req,
        res,
        next
      );
    }
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if(vnf_regex.test(phoneNumber) == false){
      return next(
        new AppError(404, "fail","Please check your phone number!"),
        req,
        res,
        next
      );
    }
    if(passWord != confirmPassWord){
      return next(
        new AppError(405, "fail","Please check your passWord and ConfrimPassWord!"),
        req,
        res,
        next
      );
    }
    const _account = await Account.create({
      phoneNumber: phoneNumber,
      passWord: passWord,
    });
    const _user = await User.create({
      fullName: fullName,
      gender: gender,
      birthday: Date.now(),
      accountID: _account.id,
    });

    const _token = createToken(_user.id);

    _account.passWord = undefined;
    req.headers.authorization = _token;
    res.status(201).json({
      status: "success",
      _token,
      data: {
        _account,
      },
    });
  } catch (err) {
    next(err);
  }
};
//Oke
exports.protect = async (req, res, next) => {
  try {
    // 1) check if the token is there
    let _token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      _token = req.headers.authorization.split(" ")[1];
    }
   
    if (!_token) {
      return next(
        new AppError(
          401,
          "fail",
          "You are not logged in! Please login in to continue"
        ),
        req,
        res,
        next
      );
    }
    const _decode = await  jwt.verify(_token, process.env.JWT_SECRET);
    // 3) check if the user is exist (not deleted)
    const _account = await Account.findById(_decode.id);
    if (!_account) {
      return next(
        new AppError(401, "fail", "This user is no longer exist"),
        req,
        res,
        next
      );
    }

    req.account = _account;
    next();
  } catch (err) {
    next(err);
  }
};
// exports.restrictTo = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.account.role)) {
//       return next(
//         new AppError(403, "fail", "You are not allowed to do this action"),
//         req,
//         res,
//         next
//       );
//     }
//     next();
//   };
// };
