const PORT = 3000;
const { app } = require('./app');
const { startDatabase } = require('./database/mongo');
const { insertCompanyDB } = require('./database/companies');
const { insertWorkerDB } = require('./database/workers');
const { insertUserDB, getUsers } = require('./database/user');

async function startServer() {
  await startDatabase();
  console.log(await insertUserDB({email: 'test@o2.pl', password: 'password'}));
  console.log(await getUsers())
  await insertCompanyDB({name: 'Sony'});
  const company1 = await insertCompanyDB({name: 'Samsung'});
  await insertWorkerDB({name: 'Adam', surname: 'Goodman', companyId: company1.toString()});
  app.listen(PORT, () => {
    console.log(`listen on ${PORT}...`)
  })
}

startServer();