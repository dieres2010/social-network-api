const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: 'Email address is required',
      validate: [isEmail, 'invalid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: []
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
  return this.friends.reduce(
    (total, friend) => total + friend.length + 1,
    0
  );
});

const Pizza = model('User', UserSchema);

module.exports = User;
