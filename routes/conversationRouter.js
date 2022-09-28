const Router = require("express").Router();
const ConversationsController = require("../controllers/conversationController");

Router.get("/:userId", ConversationsController.getAllConversationByUserID);
Router.post("/create-group", ConversationsController.createConversation);
Router.post("/delete-group/:conversationId", ConversationsController.deleteGroup);
Router.post("/change-name/:conversationId", ConversationsController.changeName);
Router.post("/update-last-message/:conversationId", ConversationsController.updateLastMsg);

Router.post("/add-member-group/:conversationId", ConversationsController.addMemberGroup);
Router.post("/out-group/:conversationId", ConversationsController.outGroup);
Router.delete("/delete-member/:memberId", ConversationsController.deleteMember);
module.exports = Router;
