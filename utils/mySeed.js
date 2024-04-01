const mongoose = require('mongoose');
const Thought = require('./models/Thought');
const Reaction = require('./models/Reaction');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialnetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Create thoughts
const thoughts = [
  {
    username: 'user1',
    thoughtText: 'This is the first post.',
    reactions: [
      { reactionBody: 'Great post!', username: 'user2' },
      { reactionBody: 'Nice work!', username: 'user3' }
    ]
  },
  {
    username: 'user2',
    thoughtText: 'Another post here.',
    comments: [
      { reactionBody: 'I disagree with some points.', username: 'user1' },
      { reactionBody: 'Can you clarify this?', username: 'user3' }
    ]
  },
  // Add more thoughts here....
];

// Function to seed posts and comments
async function seed() {
  try {
    // Clear existing data
    await Promise.all([
      Thought.deleteMany({}),
      Reaction.deleteMany({})
    ]);

    // Insert sample posts
    const createdThoughts = await Thought.create(thoughts);

    // Insert comments for each post
    for (const thought of createdThoughts) {
      const { _id: thoughtId, reactions } = thought;
      await Reaction.insertMany(reactions.map(reaction => ({ ...reaction, thoughtId })));
    }

    console.log('Data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close MongoDB connection
    mongoose.connection.close();
  }
}

// Call the seed function
seed();