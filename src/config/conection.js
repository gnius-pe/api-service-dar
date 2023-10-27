const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
let url = "mongodb+srv://igor:rpdMbeGU16tHXAQC@dar-cluster.iqyckrq.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectionBD() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}

const db = client.db("db_dar");
const collection = db.collection("usuario");

module.exports = {client,connectionBD, collection};