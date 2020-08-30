import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import Employee from './api/models/employee';
dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

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
  // app.use((req, res, next) => {
  //   res.sendFile(path.join(__dirname, "public", "index.html"));
  // });

  app.get('/hello', (req, res, next) => {
    res.json({ message: 'HELLO WORLD' })
  });

  app.get('/api/employees', (req, res, next) => {
    Employee.find()
    .exec()
    .then(result => {
      const response = {
        count: result.length,
        employees: result.map(doc => {
          return {
            ...doc._doc,
            request: {
              type: 'GET',
              url:  `http://localhost:3000/orders/${doc._id}`
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

  app.post('/api/employees', (req, res, next) => {
    const employee = new Employee({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      dob: req.body.dob,
      department: req.body.department,
      title: req.body.title,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl,
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
              url: `http://localhost:8080/employee/${result._id}`
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
            url: `http://localhost:3000/employees`
          }
        });
      })
      .catch(error => {
        res.status(500).json({
          error
        })
    });
  });

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