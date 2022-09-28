const Message = require("../models/message");
const Conversation = require("../models/conversation");
const AppError = require("../utils/appError");


//Oke
exports.createMessage = async (req, res, next) => {
  
  try {
    const {content,conversationID,senderID} = req.body;
    const _newMessage = await Message.create({
    content : content,
    conversationID:conversationID,
    senderID:senderID
   });
    await _newMessage.save();
    const _conversationNow = await Conversation.findById(
      conversationID
    );
    console.log(_conversationNow);
    const _messages = _conversationNow.messages;
    _messages.push(_newMessage);
    const _conversation = await Conversation.findByIdAndUpdate(
      { _id: conversationID },
      {
        messages: _messages,
      },
      { new: true }
    );
    res.status(200).json(_conversation._doc);
  } catch (err) {
    next(err)
  }
};
//Oke
exports.deleteMessage = async (req, res, next) => {
  try {
    const messageID = req.params.messageId;
    const conversationID = req.body.conversationID;
    await Message.findByIdAndRemove(messageID);
    const _conversationNow = await Conversation.findById(
      conversationID
    );
    const _messages = await _conversationNow.messages.pull(messageID);
    console.log(_messages);
    const _conversation = await Conversation.findByIdAndUpdate(
      { _id: conversationID},
      {
        messages: _messages,
      },
      { new: true }
    );
    res.status(200).json(_conversation);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
