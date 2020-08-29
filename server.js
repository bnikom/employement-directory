import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const port = process.env.PORT || 8080;
const app = express();

//mention ESM in docs

try {
  // middleware
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true}));
  app.use(express.static('public'));
  // app.use((req, res, next) => {
  //   res.sendFile(path.join(__dirname, "public", "index.html"));
  // });

  app.get('/hello', (req, res, next) => {
    res.json({ message: 'HELLO WORLD'})
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