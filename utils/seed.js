// Import
const mongoose = require('mongoose');
const casual = require('casual');
const User = require('../models/User');
const Thought = require('../models/Thought');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Seed function:
async function seed() {
  try {
    // Clears previous data (optional)
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create random users
    const users = [];
    for (let i = 0; i < 5; i++) {
      const user = new User({
        username: casual.username,
        email: casual.email
      });
      const savedUser = await user.save();

      // create random post content for each user
      const thoughts = [];
      for (let j = 0; j < 3; j++) {
        const thought = new Thought({
          thoughtText: casual.sentences(n = 5),
          userId: savedUser._id,
          username: savedUser.username
        });
        thoughts.push(await thought.save());
      }

      users.push(savedUser);
    }

    console.log('Database seeded successfully! 𓇢 🌱 𓇢 🌱 𓇢 🌱 𓇢');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
}

// run seed function
seed();