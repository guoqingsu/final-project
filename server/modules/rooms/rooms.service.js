const {getCollection} = require("../../database");
const { ObjectId } = require("mongodb");
class RoomsService {
  constructor() {}

  async getCollection() {
    return getCollection('rooms');
  }

  async getUserRooms(user_id) {
    const roomModel = await this.getCollection();
    const rooms = await roomModel.aggregate([
      {
        $match: {
          users: {
            $elemMatch: {
              $eq: ObjectId(user_id)
            }
          }
        }
      },
      {
        $unwind: {
          path: '$users'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'users',
          foreignField: '_id',
          as: 'users'
        }
      },
      {
        $unwind: {
          path: '$users'
        }
      },
      {
        $group: {
          _id: "$_id",
          name: {$first: "$name"},
          users: {$push: "$users"}
        }
      },
      {
        $sort: {
          name: 1
        }
      }
    ]).toArray();
    return rooms;
  }

  async getRoomByName(room_name) {
    const roomModel = await this.getCollection();
    const room = await roomModel.findOne({
      name: room_name
    });
    return room;
  }

  async createRoom({user_ids = [], name = ''}) {
    user_ids = user_ids.map(user_id => ObjectId(user_id));
    const roomModel = await this.getCollection();
    const room = await roomModel.insertOne({
      users: user_ids,
      name
    });
    return room;
  }

  async checkUserInRoom(room_id, user_id) {
    const roomModel = await this.getCollection();
    const room = await roomModel.findOne({
      _id: ObjectId(room_id)
    });
    if (room) {
      return room.users.findIndex(user => user.toString() === user_id) != -1;
    }
    return false;
  }

  async joinRoom(room_id, user_ids = []) {
    user_ids = user_ids.map(user_id => ObjectId(user_id));
    const roomModel = await this.getCollection();
    await roomModel.updateOne({_id: ObjectId(room_id)}, {
      $push: { users: { $each: user_ids } }
    });
  }
}

module.exports = new RoomsService();