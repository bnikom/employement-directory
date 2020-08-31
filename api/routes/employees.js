import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import Employee from '../models/employee';

const router = express.Router();

// detailed way of storing files
const storage = multer.diskStorage({
  destination: function(req,files, callback) {
    // where to save files on disk
    callback(null, './uploads');
  },
  // filename is just the date and time the file was posted and the original filename
  filename: function(req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname)
  },
});

const upload = multer({ storage });

// get and search ALL employees
router.get('/employees', (req, res, next) => {
  let query = {};
  // create query for search in DB if term exists
  if(req.query.searchTerm) {
    query = { $or:[
      { name:{$regex: req.query.searchTerm, $options: 'i'}},
      { department :{$regex: req.query.searchTerm, $options: 'i'}},
      { email :{$regex: req.query.searchTerm, $options: 'i'}},
      { title :{$regex: req.query.searchTerm, $options: 'i'}}
    ]}
  };
  Employee.find(query)
  .exec()
  .then(result => {
    const response = {
      count: result.length,
      employees: result.map(doc => {
        return {
          ...doc._doc,
          request: {
            type: 'GET',
            url:  `http://localhost:8080/api/employees/${doc._id}`
          }
        }
      }),
    }
    res.status(200).json(response);
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ error })
  })
});

// create new employee
// multer middleware to upload + save the photo file
router.post('/employees', upload.single('imageUrl'), (req, res, next) => {
  // create the new schema
  const employee = new Employee({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    dob: req.body.dob,
    department: req.body.department,
    title: req.body.title,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.file.path,
  });

  employee
    .save() // store in DB
    .then(result => {
      res.status(201).json({
        message: 'created employee successfully',
        createdEmployee: {
          _id: new mongoose.Types.ObjectId(),
          name: result.name,
          dob: result.dob,
          department: result.department,
          title: result.title,
          // match validates email. i got the regex from stackoverflow
          email: result.email,
          phone: result.phone,
          imageUrl: result.imageUrl,
          links: {
            type: 'GET',
            url: `http://localhost:8080/api/employee/${result._id}`
          }
        },
      });
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error });
    });
});

// get individual employee
router.get('/employee/:employeeId', (req, res, next) => {
  Employee.findById(req.params.employeeId)
    .exec()
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: 'Id does not exist' })
      }
      res.status(200).json({
        result,
        request: {
          type: 'GET',
          url: `http://localhost:8080/api/employees`
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        error
      })
  });
});

// delete employee based on id
router.delete('/employee/:employeeId', (req, res, next) => {
  Employee
    .remove({ _id: req.params.employeeId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Employee Deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:8080/api/employees',
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        error
      })
  });
});

// update employee info
router.patch('/employee/:employeeId', (req, res, next) => {
  // tell mongoose which employee to update and what fields
  Employee.updateOne({ _id: req.params.employeeId} , { $set: req.body })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Employee Updated',
        url: `http://localhost:8080/api/employee/${req.params.employeeId}`
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });
    });
});

export default router;
