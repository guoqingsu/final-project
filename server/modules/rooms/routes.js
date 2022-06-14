const express = require("express");
const roomController = require("./rooms.controller");
const {verifyUser} = require("../../middlewares/passport");

const router = express.Router();

router.get('', verifyUser, roomController.getRooms);
router.post('/create-room', verifyUser, roomController.createRoom);
router.post('/join-room/:room_name', verifyUser, roomController.joinRoom);


module.exports = router;

