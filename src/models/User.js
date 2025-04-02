const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String
  },
  nick: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',  // Si no se envía role, se guardará como 'user'
    select: false
  },
  photo: {
    type: String,
    default: 'default-avatar.png'
  },
});

module.exports = model("User", UserSchema, "users");
