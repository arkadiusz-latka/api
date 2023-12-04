const {getDatabase} = require('./mongo');
const { ObjectId } = require('mongodb');

const collectionName = 'workers';

async function insertWorkerDB(worker) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(worker);
  return insertedId;
}

async function getWorkersDB() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function getWorkersByCompanyIdDB(id) {
  const database = await getDatabase();
  return await database.collection(collectionName).find({companyId: id}).toArray();
}


async function getWorkerByIdDB(value) {
  const database = await getDatabase();
  return await database.collection(collectionName).findOne({"_id": new ObjectId(value)});
}

async function deleteWorkerDB(id) {
  const database = await getDatabase();
  const res = await database.collection(collectionName).deleteOne({
    _id: new ObjectId(id),
  });
  if(res.deletedCount === 0) {
    throw Error('Company not found');
  }
}

async function updateWorkerDB(id, worker) {
  const workerExists = await getWorkerByIdDB(worker.id);
  if(!workerExists) {
    throw Error('Worker not found');
  }
  const database = await getDatabase();
  delete worker._id;
  delete worker.id;
  await database.collection(collectionName).updateOne(
    { _id: new ObjectId(id), },
    {
      $set: {
        ...worker,
      },
    },
  );
}

module.exports = {
  insertWorkerDB,
  getWorkersDB,
  updateWorkerDB,
  deleteWorkerDB,
  getWorkerByIdDB,
  getWorkersByCompanyIdDB,
};