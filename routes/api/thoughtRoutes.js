const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getThoughts).post(createThought);

// /api/students/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// /api/students/:thoughtId/assignments
router.route('/:thoughtId/reactions').post(addReaction);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:reactionId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
