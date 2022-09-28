const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendRequestSchema = new Schema({
    senderID: {
        type:Schema.Types.ObjectId, 
        required:[true,"please fill senderID"],
        ref : "user"
    },
    reciverID:{
        type:Schema.Types.ObjectId,
        required:[true,"please fill reciverID"],
        ref:"user"
    },
    status:["Oke","Cancle"]
})

module.exports = mongoose.model("FriendRequest",friendRequestSchema)