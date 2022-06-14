const express = require("express");
const MessageController = require("./messages.controller");
const {verifyUser} = require("../../middlewares/passport");

const router = express.Router();

router.get('/:room_id', verifyUser, MessageController.getMessagesOfRoom);
router.post('/:room_id', verifyUser, MessageController.sendMessage);
router.post('/friend/:friend_name', verifyUser, MessageController.chatWithFriend);

module.exports = router;
