const mongoose = require('mongoose');

const Employee = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  dob: {
    type: Date,
    required: true,
    trim: true,
  },
  department: { type: String, required: true },
  title: String,
  // match validates email. i got the regex from stackoverflow
  email: { 
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  phone: String,
  imageUrl: String
});

module.exports = mongoose.model('Order', Employee)
