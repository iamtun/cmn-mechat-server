const mongoose = require('mongoose');

const Schema = mongoose.Schema

const messageSchema = new Schema(
    {
        content:{
            type:String,
            required:[true,"Please fill content"]
        },
        imageLink:{
            type:String,
            default:null
        },
        conversationID:{
            type: Schema.Types.ObjectId,
            required:[true,"Please fill conversationID"],
            ref:'conversation'
        },
        senderID : { 
            type: Schema.Types.ObjectId, 
            required:[true,"Please fill senderID"],
            ref: 'user' 
        } 
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("Message",messageSchema);