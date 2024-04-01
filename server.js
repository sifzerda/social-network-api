const express = require('express');
const mongodb = require('mongodb').MongoClient;
// We import the ObjectId class from mongodb
const { MongoClient, Thought, User, ObjectId } = require('mongodb');

const app = express();
const port = 3003;

const connectionStringURI = `mongodb://127.0.0.1:27017`;

const client = new MongoClient(connectionStringURI);

let db;

const dbName = 'socialnetworkDB';

client.connect()
  .then(() => {
    console.log('Connected successfully to MongoDB');
    db = client.db(dbName);

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Mongo connection error: ', err.message);
  });

app.use(express.json());

app.post('/think', (req, res) => {
  // The title and author will be provided by the request body
  db.collection('thoughtCollection').insertOne(
    { thoughtText: req.body.thoughtText, username: req.body.username }
  )
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

app.get('/thought', (req, res) => {
  db.collection('thoughtCollection')
    .find({})
    .toArray()
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

// TODO: Add Delete route that uses a filter to delete a single document by id
app.delete('/unthink', (req, res) => {
  // The title and author will be provided by the request body
  db.collection('thoughtCollection').deleteOne(
    { _id: new Thought(req.body.id) }
  )
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});