const { Schema, Types } = require('mongoose');

// Schema to create Reaction Model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
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
        toJSON: { virtuals: true, getters: true },
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
