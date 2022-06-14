const {getCollection} = require("../../database");

class UsersService {
  constructor() {}

  async findUser(email) {
    const userModel = await getCollection('users');
    return userModel.findOne({email});
  }

  async findUserByName(username) {
    const userModel = await getCollection('users');
    return userModel.findOne({username});
  }

  async createUser(user) {
    const userModel = await getCollection('users');
    return userModel.insertOne(user);
  }
}

module.exports = new UsersService();