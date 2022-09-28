const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName : {
        type:String,
        required:[true,"Please fill your fullname"]
    },
    bio:String,
    gender:{
        type:Number,
        required:[true,"Please fill your gender"],
        default: 0
    },
    birthday: {
        type:Date,
        required:[true,"Please fill your birthday"],
        default:Date.now()
    },
    status:{
        type:Boolean,
        default:true
    },
    avartarLink:{
        type:String,
        default:null
    },
    backgroundLink:{
        type:String,
        default:null
    },
    accountID : { 
        type: Schema.Types.ObjectId, 
        required:[true,"Please fill acountID"],
        ref: 'account' 
    },
    friendID:{
        type:Schema.Types.ObjectId,
        ref:'friend', 
        default:null
    }
})

module.exports = mongoose.model("User",userSchema);