const {getDatabase} = require('./mongo');
const { ObjectId } = require('mongodb');
const { verifyCompany } = require('../validators/comapny.validator');

const collectionName = 'companies';

async function insertCompanyDB(company) {
  verifyCompany(company);
  try {
    const database = await getDatabase();
    const {insertedId} = await database.collection(collectionName).insertOne(company);
    return insertedId;
  } catch(e) {
    throw e;
  }
}

async function getCompaniesDB() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function getCompanyByIdDB(value) {
  const database = await getDatabase();
  return await database.collection(collectionName).findOne({"_id": new ObjectId(value)});
}

async function deleteCompanyDB(id) {
  const database = await getDatabase();
  const res = await database.collection(collectionName).deleteOne({
    _id: new ObjectId(id),
  });
  if(res.deletedCount === 0) {
    throw Error('Company not found');
  }
}

async function updateCompanyDB(id, company) {
  const companyExists = await getCompanyByIdDB(company.id);
  if(!companyExists) {
    throw Error('Company not found');
  }
  const database = await getDatabase();
  delete company._id;
  delete company.id;
  await database.collection(collectionName).updateOne(
    { _id: new ObjectId(id), },
    {
      $set: {
        ...company,
      },
    },
  );
}

module.exports = {
  insertCompanyDB,
  getCompaniesDB,
  getCompanyByIdDB,
  deleteCompanyDB,
  updateCompanyDB,
};