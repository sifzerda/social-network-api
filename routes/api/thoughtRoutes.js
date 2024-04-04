const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
.get(getThoughts)
.post(createThought);

// /api/thoughts/:id
router.route('/:thoughtId')
.get(getSingleThought)
.delete(deleteThought)
.put(updateThought);

// /api/thought/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(createReaction);

// /api/thought/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;
