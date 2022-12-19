import express from 'express';
import apiRouter from './router/api.js';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// serve static files
app.use(express.static('public'));

// use router
app.use('/api', apiRouter);

// Connect Mongoose
mongoose.set('strictQuery', false);
mongoose
  .connect(
    'mongodb://root:example@localhost:27017/orderingApp?authSource=admin&readPreference=primary&directConnection=true&ssl=false',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('MongoDB Connected...');
    // start server
    app.listen(3001, console.log('Ordering App Server is listening on port 3001!'));
  })
  .catch((err) => console.log(err));
