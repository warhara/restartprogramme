const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
let dbConnection;

module.exports = {
  connectToServer: (callback) => {
    client.connect((err, db) => {
      if (err || !db) return callback(err);
      dbConnection = db.db("ReStartDB");
      console.log("successfully connected");
      callback();
    });
  },
  getDb: function () {
    return dbConnection;
  },
};
