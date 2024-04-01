const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }

  // Create empty array to hold the students
  const users = [];

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    //const assignments = getRandomAssignments(20);

    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    //const //github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    users.push({
      first,
      last,
      //github,
    });
  }

  // Add students to the collection and await the results
  const userData = await User.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thought.insertOne({
    thoughtName: 'This is a thought',
    inPerson: false,
    users: [...userData.map(({_id}) => _id)],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
