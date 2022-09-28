const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    name:  {
        type:String,
        default:null
    },
    imageLink:{
        type:String,
        default:null
    },
    lastMessage: {type:Schema.Types.ObjectId,ref:'message',default:null},
    members :[{type: Schema.Types.ObjectId,required:true, ref: 'user'}] ,
    messages:[{type:Schema.Types.ObjectId, ref:'message',default:null}],
    createdBy:[{type:Schema.Types.ObjectId,required:true, ref:'user'}]
    
})

module.exports = mongoose.model("Conversation",conversationSchema);