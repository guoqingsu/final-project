const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URL;
const client = new MongoClient(url);

const getCollection = async (collection_name) => {
  await client.connect();
  const db = client.db('chat');
  return db.collection(collection_name);
}

module.exports = {
  getCollection
}