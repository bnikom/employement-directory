import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import Employee from '../models/employee';

const router = express.Router();

// detailed way of storing files
const storage = multer.diskStorage({
  destination: function(req,files, callback) {
    // have to have null as first arg or it will throw an error
    callback(null, './uploads');
  },
  filename: function(req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname)
  },
});

const upload = multer({ storage });

router.get('/employees', (req, res, next) => {
  let query = {};
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

router.post('/employees', upload.single('imageUrl'), (req, res, next) => {
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
        createdProduct: {
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

router.patch('/employee/:employeeId', (req, res, next) => {
  Employee.update({ _id: req.params.employeeId} , { $set: req.body })
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
