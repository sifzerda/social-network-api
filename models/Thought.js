const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create a User model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ reactionSchema ]
    },

    {
        toJSON: { virtuals: true, },
        id: false,
    });

// Define a getter method for the createdAt field to format the date
thoughtSchema.path('createdAt').get(function (value) {
    // Format the date as you desire, for example:
    return value.toLocaleString('en-US', { timeZone: 'UTC' });
});

// creates virtual:
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;

//================================================================== //

/// alternate way of formatting timestamp

// thoughtSchema.virtual('formattedCreatedAt').get(function() {
//    return this.createdAt.toISOString(); // timestamp format here
//});