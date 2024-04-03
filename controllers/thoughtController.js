const { Thought, User } = require('../models');
//const { ObjectId } = require('mongoose').Types;

const thoughtController = {

// =================================================================================//
//                                  API ROUTES                                      //
// ================================================================================ //

  // Get all thoughts  =============================================== //
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate('reactions');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a thought  =============================================== //
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
      res.status(500).json(err);
    }
  },

  // Create a thought  =============================================== //
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      // ** push created thought id to user's thought array field **
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete a thought  =============================================== //
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }
                         // IS THIS BELOW CORRECT? //
      await Reaction.deleteMany({ _id: { $in: thought.reactions } });
      res.json({ message: 'Thought and Reactions deleted!' });
    } catch (err) {
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
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// CREATE REACTION ================== //

  // Create a reaction  =============================================== //
  async createReaction(req, res) {
    try {
      const reaction = await Reaction.create(req.body);

      // ** push created thought id to user's thought array field **
      res.json(reaction);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

// DELETE REACTION ================== //

  // Delete a thought  =============================================== //
  async deleteReaction(req, res) {
    try {
      const reaction = await Reaction.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }
                         // IS THIS BELOW CORRECT? //
      await Reaction.deleteMany({ _id: { $in: thought.reactions } });
      res.json({ message: 'Thought and Reactions deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

// Exports the controller module
module.exports = thoughtController;




  

