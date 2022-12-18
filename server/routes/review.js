const express = require("express");

const router = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you get a list of all the records.
router.get("/reviews", async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("reviews")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

// This section will help you create a new record.
router.post("/reviews/add", function (req, res) {
  const dbConnect = dbo.getDb();
  const reviewDocument = {
    author: req.body.author,
    content: req.body.content,
    submitted_at: new Date(),
  };

  dbConnect
    .collection("reviews")
    .insertOne(reviewDocument, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting review!");
      } else {
        console.log(`Added a new review with id ${result.insertedId}`);
        res.status(204).json({ data: result.ops[0] });
      }
    });
});

module.exports = router;
