const MessagesService = require("./messages.service");
const UsersService = require("../users/users.service");
const RoomsService = require("../rooms/rooms.service");
class MessagesController {
  constructor() {}

  async chatWithFriend(req, res) {
    try {
      const user = req.user;
      const {friend_name} = req.params;
      const friend = await UsersService.findUserByName(friend_name);
      if (!friend) {
        return res.status(404).send("Not found your friend!");
      }
      // create a new room
      const room = await RoomsService.createRoom({user_ids: [friend._id.toString(), user.id]});

      return res.status(200).json(room);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async sendMessage(req, res) {
    try {
      const user = req.user;
      const {room_id} = req.params;
      const {content} = req.body;
      await MessagesService.createMessage(room_id, user.id, content);
      res.status(200).send();
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async getMessagesOfRoom(req, res) {
    try {
      const {room_id} = req.params;
      const messages = await MessagesService.getMessagesOfRoom(room_id);
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new MessagesController();