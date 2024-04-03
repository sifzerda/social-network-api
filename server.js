const express = require('express');
//const //mongodb = require('mongodb').MongoClient;
// We import the ObjectId class from mongodb
const { MongoClient } = require('mongodb');
const { Thought, User } = require('./models/index');

const app = express();
const PORT = process.env.PORT || 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017`;
const client = new MongoClient(connectionStringURI);
let db;
const dbName = 'socialnetworkDB';

client.connect()
  .then(() => {
    console.log('Connected successfully to MongoDB');
    db = client.db(dbName);

    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Mongo connection error: ', err.message);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());






// =================================================================================//
//                                  API ROUTES                                      //
// ================================================================================ //

// ========= create a new thought ================================ //

app.post('/imagine', (req, res) => {
  // The text and username will be provided by the request body
  db.collection('thoughtCollection').insertOne(
    { thoughtText: req.body.thoughtText, username: req.body.username }
  )
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

// ========= GET thoughts ================================ //

app.get('/thought', (req, res) => {
  db.collection('thoughtCollection')
    .find({})
    .toArray()
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

// ========= DELETE thought by id ================================ //

// Delete route that uses a filter to delete a single document by id
app.delete('/forget', (req, res) => {
  // The title and author will be provided by the request body
  db.collection('thoughtCollection').deleteOne(
    { _id: new Thought(req.body.id) }
  )
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

// ========= UPDATE thought by id ================================ //

app.put('/reconsider', async (req, res) => {
  // a route that will find the first instance of a document that contains a name with the value equal to 
  // Update that name with the value given from the URL param
  // Return the updated document
  try {
    const result = await Thought.findOneAndUpdate(
      { name: 'Kids' },
      { name: req.params.genre },
      // below will return the updated version
      { new: true }
      );
    res.status(200).json(result);
    console.log(`Updated: ${result}`);
  } catch (err) {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ message: 'something went wrong' });
  }
});