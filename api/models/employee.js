const mongoose = require('mongoose');

const Employee = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  department: { type: String, required: true },
  dob: {
    type: Date,
    required: true,
    trim: true,
  },
  // match validates email. i got the regex from stackoverflow
  email: { 
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  imageUrl: String,
  name: String,
  phone: String,
  title: String,
});

module.exports = mongoose.model('Order', Employee)
