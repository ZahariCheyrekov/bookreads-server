import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import { configDatabase } from './config/configDatabase.js';
import { DEFAULT_PORT } from './constants/index.js';

import userRouter from './routes/user.js';
import bookRouter from './routes/book.js';
import postRouter from './routes/post.js';
import reviewRouter from './routes/review.js';
import genresRouter from './routes/genre.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended: true, limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/user', userRouter);
app.use('/books', bookRouter);
app.use('/', postRouter);
app.use('/', reviewRouter);
app.use('/genres', genresRouter);

app.get('/', (req, res) => {
    res.send('Application is running correctly.');
});

const PORT = process.env.PORT || DEFAULT_PORT;

configDatabase(app, PORT);
