const AppError = require("../utils/appError");
const Conversation = require("../models/conversation");
const User = require("../models/user");

//Oke
exports.getAllConversationByUserID = async (req, res, next) => {
  try {
    const doc = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    if (!doc) {
      return next(
        new AppError(404, "fail", "No document found with that id"),
        req,
        res,
        next
      );
    }
    res.status(200).json({
      status: "success",
      data: { doc },
    });
  } catch (error) {
    next(error);
  }
};
//Chua test
exports.getConversationWithFriend = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      $and: [
        { members: { $size: 2 } },
        { members: { $all: [req.params.friendId, req.body.userId] } },
      ],
    });
    res.status(200).json(conversation[0]);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
//OKe
exports.addMemberGroup = async (req, res) => {
  const { conversationId } = req.params;
  const newMember = req.body.userID;
  try {
    const conversationNow = await Conversation.findById(conversationId);
    const members = conversationNow.members;
    members.push(newMember);
    const conversation = await Conversation.findByIdAndUpdate(
      { _id: conversationId },
      {
        members: members,
      },
      { new: true }
    );
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
//Oke
exports.deleteMember = async (req, res) => {
  let { memberId } = req.params;
  try {
    let { conversationId, userId } = req.body;
    let conversationNow = await Conversation.findById(conversationId);
    let mainUser = await Conversation.find({
      createBy: { $in: [userId] },
    });
    console.log(conversationNow);
    console.log(mainUser);
    if (mainUser) {
      const members = conversationNow.members.pull(memberId);

      const conversation = await Conversation.findByIdAndUpdate(
        { _id: conversationId },
        {
          members: members,
        },
        { new: true }
      );
      res.status(200).json(conversation);
    } else {
      return res
        .status(500)
        .json({ msg: "Chỉ có admin mới có quyền xóa thành viên" });
    }
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
};
//Oke
exports.deleteGroup = async (req, res) => {
  const conversationId = req.params.conversationId;
  console.log(conversationId);
  try {
    const user = req.body.userId;
    console.log(user);
    const conversation = await Conversation.findById({ _id: conversationId });
    if (conversation.createBy == user) {
      await Conversation.findByIdAndDelete({ _id: conversationId });

      res.status(200).json({ msg: "Xóa nhóm chat thành công!" });
    } else {
      res.status(500).json({ msg: "Chỉ có admin mới có quyền xóa nhóm chat" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
};
//OKe
exports.createConversation = async (req, res, next) => {
  try {
    const { members, createdBy } = req.body;
    // var _newName = "";
    // console.log(members);
    // for (let i = 0; i < members.length; i++) {
    //   let _user = await User.find({ id: members[i] });
    //   console.log(_user);
    //   _newName += _user.fullName;
    //   console.log(_user.fullName);
    // }
    // let _user = await User.find({ id: members[0] });
    // console.log(_user);
    // for (let i = 0; i < _user.length; i++) {
      // _newName += await _user[i].fullName;
    // }
    // console.log(_newName);
    const newConversation = new Conversation({
      members: members,
      createdBy: createdBy,
    });
    const savedConversation = await newConversation.save();
    const conversation = await Conversation.findById({
      _id: savedConversation.id,
    });

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
//Oke
exports.updateLastMsg = async (req, res) => {
  const msgId = req.body.lastMsgId;
  try {
    const conversation = await Conversation.findOneAndUpdate(
      { _id: req.params.conversationId },
      { lastMessage: msgId }
    );
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
//Oke
exports.outGroup = async (req, res) => {
  try {
    let { userId } = req.body;
    let conversationNow = await Conversation.findOne({
      _id: req.params.conversationId,
    });
    console.log(conversationNow);
    let members = conversationNow.members.pull(userId);
    let conversation = await Conversation.findByIdAndUpdate(
      { _id: req.params.conversationId },
      {
        members: members,
      },
      { new: true }
    );
    res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
};
//Oke
exports.changeName = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.conversationId);
    if (conversation.name !== undefined) {
      await Conversation.findByIdAndUpdate(
        { _id: req.params.conversationId },
        {
          name: req.body.newName,
        },
        { new: true }
      );
    }

    res
      .status(200)
      .json(await Conversation.findById(req.params.conversationId));
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
