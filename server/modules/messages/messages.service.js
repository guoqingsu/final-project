const { ObjectId } = require("mongodb");
const {getCollection} = require("../../database");

class MessagesService {
  constructor() {}

  async getCollection() {
    return getCollection('messages');
  }

  async getMessagesOfRoom(room_id) {
    const messageModel = await this.getCollection();
    const messages = await messageModel.aggregate([
      {
        $match: {
          room: ObjectId(room_id)
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'sender',
          foreignField: '_id',
          as: 'sender'
        }
      },
      {
        $unwind: {
          path: '$sender'
        }
      },
      {
        $sort: {
          createdTime: 1
        }
      }
    ]).toArray();
    return messages;
  }

  async createMessage(room_id, sender_id, content) {
    const messageModel = await this.getCollection();
    const message = await messageModel.insertOne({
      room: ObjectId(room_id),
      sender: ObjectId(sender_id),
      content: content,
      createdTime: Date.now()
    });
    return message;
  }
}

module.exports = new MessagesService();