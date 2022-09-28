const Router = require("express").Router();
const MessagesController = require("../controllers/messageController");

Router.post("/", MessagesController.createMessage)
Router.delete("/delete-message/:messageId", MessagesController.deleteMessage)
// router.get("/:conversationId",MessagesController.getMessageByConversationId)
module.exports = Router