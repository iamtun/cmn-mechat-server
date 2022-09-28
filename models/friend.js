const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const friendSchema = new mongoose.Schema({
    userID:{type: Schema.Types.ObjectId, ref: 'user'},
    friends:[{ type: Schema.Types.ObjectId, ref: 'user' }]
})

module.exports = mongoose.model("Friend",friendSchema);