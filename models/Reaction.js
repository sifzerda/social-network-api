const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Reaction Model
const reactionSchema = new Schema(
{
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},
{
    toJSON: { virtuals: true, },
    id: false,
});

// Use a getter method for the createdAt field to format the date
reactionSchema.path('createdAt').get(function (value) {
    // Format the date as you desire, for example:
    return value.toLocaleString('en-US', { timeZone: 'UTC' });
});

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;

//================================================================== //
