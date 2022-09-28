const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt')

//models
const Account = require("./models/account")
const Conversation = require("./models/conversation")
const Friend = require("./models/friend")
const FriendRequest = require("./models/friendRequest")
const Message = require("./models/message")
const User = require("./models/user")

dotenv.config({
    path: './config.env'
});


process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

const app = require('./app');

// Connect the database
mongoose.connect(
    process.env.DATABASE,
    () => {
      console.log("Success");
    },
    (e) => console.error(e)
  );

//Socket

// Start the server
const _port = process.env.PORT;
app.listen(_port, () => {
    console.log(`Application is running on port ${_port}`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

// run();
// async function run(){
//     ///User 1
//   const _HuyAccount = await Account.create({
//     phoneNumber:"0879276284",
//     passWord:await bcrypt.hash("123456",10),
//   })

//   const _HuyUser = await User.create({
//     fullName : "Nguyễn Đức Huy",
//     bio:"Sông Lam",
//     birthday:Date.now() ,
//     accountID:_HuyAccount,
//   })

//   //User 2

//   const _HungAccount = await Account.create({
//     phoneNumber:"0348858787",
//     passWord:await bcrypt.hash("123456",10),
//   })

//   const _HungUser = await User.create({
//     fullName : "Nguyễn Đức Hùng",
//     bio:"Sông Lam",
//     birthday:Date.now() ,
//     accountID:_HungAccount
//   })

//   //User 3
//   const _ThaoAccount = await Account.create({
//     phoneNumber:"0912212231",
//     passWord:await bcrypt.hash("123456",10),
//   })

//   const _ThaoUser = await User.create({
//     fullName : "Thu Thảo",
//     bio:"Sông Lam",
//     birthday:Date.now() ,
//     accountID:_ThaoAccount
//   })

//   //Conversation
//   const _3Member = await Conversation.create({
//     name:  "ChatRoom",
//     members :[_HungUser,_HuyUser,_ThaoUser] ,
//     createdBy:[_HuyUser]
//   })
//   // Req
//   const _FriendRequest1 = await FriendRequest.create({
//     senderID:_HuyUser,
//     reciverID:_HungUser,
//   })
//   const _ThaoMessage = await Message.create({
//     content:"Thảo",
//     senderID:_ThaoUser,
//     conversationID:_3Member
//   })
//   const _HuyMessage = await Message.create({
//     content:"Huy",
//     senderID:_HuyUser,
//     conversationID:_3Member
//   })
//   const _HungMessage = await Message.create({
//     content:"Hùng",
//     senderID:_HungUser,
//     conversationID:_3Member
//   })



//   await _HuyAccount.save()
//   await _HuyUser.save()
//   await _HuyMessage.save()
//   await _HungAccount.save()
//   await _HungUser.save()
//   await _HungMessage.save()
//   await _FriendRequest1.save()
//   await _ThaoAccount.save()
//   await _ThaoUser.save()
//   await _ThaoMessage.save()
//   await _3Member.save()
// }
