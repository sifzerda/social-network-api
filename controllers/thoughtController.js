const { Thought, User } = require('../models');
//const { ObjectId } = require('mongoose').Types;

const thoughtController = {

  // =================================================================================//
  //                              THOUGHT API ROUTES                                  //
  // ================================================================================ //

  // Get all thoughts  =============================================== //
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate('reactions');
      res.json(thoughts);
    } catch (err) {
      console.log('ERROR: getting all thoughts', err);
      res.status(500).json(err);
    }
  },

  // Get a thought by id =============================================== //
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select("-__v")
        .populate('reactions');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      console.log('Error: getting a single thought by id', err);
      res.status(500).json(err);
    }
  },

  // Create a thought  =============================================== //
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      const userID = req.body.userId;
      const user = await User.findById(userID);
      // if user id not found, return error:
      if (!user) {
        return res.status(404).json({ error: 'Error 404: finding user by id or user does not exist' });
      }
      // ** push created thought id to user's thought array field **
      user.thoughts.push(thought._id);

      res.status(200).json({ message: '200: Thought created successfully', thought });
      //res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 'Error 500: creating thought status' });
    }
  },

  // Delete a thought  =============================================== //
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'Error 404: No thought found with that ID' });
      };

      res.status(200).json({ message: '200: Thought and its Reactions was successfully deleted'});
    } catch (err) {
      console.log('Error 500 deleting a thought');
      res.status(500).json(err);
    }
  },

  // Update a thought =============================================== // <-- DONE
async updateThought(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'Error 404: No thought with this ID' });
    }

    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating thought', err});
  }
},

  // ========================== REACTIONS ============================= //

// Create a reaction by updating the thought:

  async createReaction(req, res) {
    try {
      // Finds the thought by ID and update it to add the reaction:

      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true } // Return updated document:
      );
  
      if (!thought) {
        return res.status(404).json({ error: 'Error 404: No thought with this id' });
      }
  
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a reaction by updating the thought //

  async deleteReaction(req, res) {
    try {
      // Find the thought by ID and update it to add the reaction:
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ error: 'Error 404: No thought with this id' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

// Exports the controller module
module.exports = thoughtController;






