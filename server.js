import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';

import Employee from './api/models/employee';
dotenv.config();

// didn't do media queries

const port = process.env.PORT || 8080;
const app = express();


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

//mention ESM in docs
mongoose.connect(
  `mongodb+srv://AvrilLavigne:${process.env.MONGO_URI}@employee-directory.jaufd.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on('open', function (ref) {
  console.log('Connected to Mongo server...');
});

mongoose.connection.on('error', function (err) {
  console.log('Could not connect to Mongo server...');
  console.log(err);
});

try {
  // middleware
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use('/uploads', express.static('uploads'))

  app.get('/api/employees', (req, res, next) => {
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

  app.post('/api/employees', upload.single('imageUrl'), (req, res, next) => {
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

  app.get('/api/employee/:employeeId', (req, res, next) => {
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

  app.delete('/api/employee/:employeeId', (req, res, next) => {
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

  app.patch('/api/employee/:employeeId', (req, res, next) => {
    console.log(req.body)
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
  })

  app.use((req, res, next) => {
    throw { status: 404 }
  });

  // catches all error because of first error arg
  app.use((error, req, res, next) => {
    console.log(error)
    res.status(error.status || 500).json({
      error: {
        message: error
      }
    })
  })


  app.listen(port, () => `service is listening on port: ${port}`);
} catch (error) {
  console.log('service failed to start: ', error)
}