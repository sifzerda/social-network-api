const { Schema, model, Types } = require('mongoose');
const thoughtSchema = require('./Thought');
const dayjs = require('dayjs');

// Schema to create Reaction Model ================================================= //
// * doesn't have own model
// * embedded inside thoughtSchema

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
            default: Date.now,
            get: formatDate
        },
    },
    {
        toJSON: { virtuals: true, getters: true },
        id: false,
    });

// Schema to create a User model ================================================== //
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
            default: Date.now,
            get: formatDate
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },

    {
        toJSON: { virtuals: true, getters: true },
        id: false,
    });

// Defines a getter method to format the date using dayjs
function formatDate(date) {
    return dayjs(date).format('ddd, MMM D, YYYY h:mm A');
};

// creates virtual:
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;

//================================================================== //

/// alternate way/s of formatting timestamp:

// thoughtSchema.virtual('formattedCreatedAt').get(function() {
//    return this.createdAt.toISOString(); // timestamp format here
//});

// Define a getter method for the createdAt field to format the date
//thoughtSchema.path('createdAt').get(function (value) {
    // Formats:
//   return value.toLocaleString('en-US', { timeZone: 'UTC' });
//});

// Use a getter method for the createdAt field to format the date
//reactionSchema.path('createdAt').get(function (value) {
    // Format the date as you desire, for example:
//    return value.toLocaleString('en-US', { //timeZone: 'UTC' });
//});




