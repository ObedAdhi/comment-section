const { MongoClient } = require('mongodb')

let database = null

async function connect() {
  try {
    const uri = 'mongodb://mongo:27017'
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect()

    const db = client.db('commentSection')
    database = db
    console.log("connected to mongoDB");

    return db
  } catch (error) {
    console.log(error);
  }
}

function getDatabase() {
  return database
}

module.exports = {
  connect,
  getDatabase
}