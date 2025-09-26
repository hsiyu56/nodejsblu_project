const mongoose = require('mongoose');
const SigninSchema = new mongoose.Schema({
  name:{
    type: String,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  birthday: {
    type: String,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  posttime: {
    type: Date,
    default: Date.now(),
  },
});

const signin = mongoose.model('signup', SigninSchema);
module.exports = signin;
