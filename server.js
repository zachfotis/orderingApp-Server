import express from 'express';
import apiRouter from './router/api.js';
import cors from 'cors';

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

// use router
app.use('/api', apiRouter);

// start server
app.listen(3001, console.log('Ordering App Server is listening on port 3001!'));
