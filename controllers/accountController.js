const AppError = require('../utils/appError');
const Account  = require("../models/account")

exports.updateAccount = async (req, res, next) => {
    try {
        const doc = await Account.findByIdAndUpdate(req.params.accountID, req.body, {
            new: true,
            runValidators: true
        });
        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }
        res.status(200).json({
            status: 'success',
            data: {doc}
        });
    } catch (error) {
        next(error);
    }
};

exports.getAccount = async (req, res, next) => {
    try {
        const doc = await Account.findById(req.params.accountID);
        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }
        res.status(200).json({
            status: 'success',
            data: {doc}
        });
    } catch (error) {
        next(error);
    }
};

