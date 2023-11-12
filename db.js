const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const dbName = "task_list_data_bases";

const connectDB = async function () {
  await client.connect();
  console.log("Connected succesfully to the DB!!");
  const db = client.db(dbName);
  return db;
};

module.exports = connectDB;
