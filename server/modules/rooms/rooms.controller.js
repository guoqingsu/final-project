const RoomService = require("./rooms.service");
class RoomsController{
  constructor() {}

  async getRooms(req, res) {
    try {
      const user = req.user;
      const rooms = await RoomService.getUserRooms(user.id);
      res.status(200).json(rooms);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }

  async createRoom(req, res) {
    try {
      const user = req.user;
      const {name} = req.body;
      const oldRoom = await RoomService.getRoomByName(name);
      if (oldRoom) {
        return res.status(409).send("Room already exist!");
      }
      const room = await RoomService.createRoom({name, user_ids: [user.id]});
      res.status(200).json(room);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }

  async joinRoom(req, res) {
    try {
      const {room_name} = req.params;
      const user = req.user;
      const oldRoom = await RoomService.getRoomByName(room_name);
      if (!oldRoom) {
        return res.status(404).send("Not found room!");
      }

      const userInRoom = await RoomService.checkUserInRoom(oldRoom._id.toString(), user.id);
      if (userInRoom) {
        return res.status(409).send("You have joined this room!");
      }

      await RoomService.joinRoom(oldRoom._id.toString(), [user.id]);
      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }


}

module.exports = new RoomsController();