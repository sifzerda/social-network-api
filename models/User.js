const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema to create a User model
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        default: true,
        required: true,
        unique: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please enter a valid email address']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
},
    {
        toJSON: { virtuals: true, },
        id: false,
    });

// creates virtual:
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;


//////////////////////////////////////

// alternate form of email validation:

//email: {
//    type: String,
//    default: true,
//    required: true,
//    unique: true,
//    validate: {
//      validator: function(email) {
//          //regex to match email:
//         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//      },
//      message: props => `${props.value} is not a valid email address!`
//    }
//  },