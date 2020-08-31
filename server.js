import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import routes from './api/routes';
// use dotenv to store private vars
dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

// connect to mongoDB database
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
  app.use(morgan('combined'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use('/uploads', express.static('uploads'))

  // api routes
  app.use('/api', routes);

  // handle api 404 pages
  // if this middleware is reached - the page is not found
  app.use((req, res, next) => {
    const error = new Error('error')
    error.status = 404;
    throw error;
  });

  // catches all api errors
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