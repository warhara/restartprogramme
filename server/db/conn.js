const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://main-user:adnan1234@cluster0.ytmaq.mongodb.net/?retryWrites=true&w=majority";
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
