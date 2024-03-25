import express from 'express';
import cors from 'cors';
import mongoose from './db/dbConnection.js';
import routes from './routes/index.js';

const app = express();

// middleware
app.use(express.json());
app.use(express.json('uploads'));
app.use(cors());
app.use(routes);
app.set('view engine', 'ejs');

// 404 path
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route Not Found' });
});
app.listen(3000);
