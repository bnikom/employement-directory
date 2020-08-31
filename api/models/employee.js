const mongoose = require('mongoose');

/**
 * Schema for saving/updating Employee in MongoDG (using Mongoose)
 * @param {ObjectId} _id Mongoose feature to create new random id for each user
 * @param {string} department department of employee. It is required to create and employee
 * @param {Date} dob employee date of birth using the Mongoose Date Object. Also required, as all employees have a dob
 * @param {string} email match regex validates email (I got the regex from stackoverflow). Every email must be unique . Also required.
 * @param {string} imageUrl file url of photo uploaded. Not required.
 * @param {string} name employee's full name. obviously required
 * @param {string} phone employee's work phone number
 * @param {string} title employee's job title
 */
const employeeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  department: { type: String, required: true },
  dob: {
    type: Date,
    required: true,
    trim: true,
  },
  email: { 
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  imageUrl: String,
  name: { type: String, required: true },
  phone: String,
  title: String,
});

module.exports = mongoose.model('orders', employeeSchema)
