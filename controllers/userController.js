//const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

const userController = {

  // =================================================================================//
  //                                  API ROUTES                                      //
  // ================================================================================ //

  // GET all users ============================================== //

  async getUsers(req, res) {
    try {
      const users = await User.find()
        // .select("-__v") excludes the __v field from result
        .select("-__v")
        .populate('friends');

      res.json(users);
    } catch (err) {
      console.log('Error 500 getting all users', err);
      return res.status(500).json({ message: 'Error getting all users' });
    }
  },

  // GET a single user by id ============================================== // 

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate('friends');
      // If user isn't found, return 404 error:
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST / create a new user ============================================ //

  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      console.log('Error 500 creating a new user');
      res.status(500).json(err);
    }
  },

  // DELETE a user by id and remove their thought/s ================= //

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete(
        { _id: req.params.userId },
        { $pull: { thoughts: { thoughtId: req.params.thoughtId } } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ message: `Error 500 removing user's thoughts`, err });
    }
  },

  // PUT (Update) find user by id, update thought thoughtText  ============================================ //

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId, 'thoughts.thoughtId': req.params.thoughtId },
        { $set: { 'thoughts.$.thoughtText': req.body.thoughtText } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error 500 updating user with reaction', err });
    }
  },

  // POST / add a user's friend ============================================ //

  async createFriend(req, res) {
    try {
      const { friendId } = req.params;
      const user = await User.findByIdAndUpdate(req.params.id,
        { $push: { friends: friendId } }, // Add friend to user's friends list
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if friend is already in user's friends list
      if (user.friends.includes(friendId)) {
        return res.status(400).json({ error: `Friend already exists in this user's friends list` });
      }

      res.status(200).json(befriendedUser);
    } catch (error) {
      console.error('Error creating friend:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // DELETE a user's friend ================= //

  async deleteFriend(req, res) {
    try {
      const { friendId } = req.params;
      const user = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: friendId } },
        { new: true }
      )

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if friend is in user's friends list
      if (!user.friends.includes(friendId)) {
        return res.status(400).json({ error: 'Friend does not exist in the user\'s friends list' });
      }

      // Respond with the updated user
      res.status(200).json(unfriendedUser);
    } catch (error) {
      console.error('Error deleting friend:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

// Exports the controller module
module.exports = userController;