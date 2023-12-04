const { ObjectId } = require('mongodb');
const {getDatabase} = require('./mongo');
const bcrypt = require("bcrypt");

const collectionName = 'user';

async function insertUserDB(user) {
  const userExisting = await getUserByField('email', user.email);
  if(userExisting) {
    throw Error('user already exists');
  }
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt)
  const database = await getDatabase();
  const { insertedId } = await database.collection(collectionName).insertOne(user);
  return insertedId;
}

async function getUsers(key, value) {
  const database = await getDatabase();
  return database.collection(collectionName).find({}).toArray();
}

async function getUserByField(key, value) {
  const database = await getDatabase();
  return database.collection(collectionName).findOne({[key]: value});
}

async function getUserById(value) {
  const database = await getDatabase();
  return database.collection(collectionName).findOne({"_id": new ObjectId(value)});
}

module.exports = {
  insertUserDB,
  getUserByField,
  getUserById,
  getUsers,
};