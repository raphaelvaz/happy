import 'reflect-metadata';

import express from 'express';
import path from 'path';
import cors from 'cors';
import 'express-async-errors';

import "./database/connection";

import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/tmp', express.static(path.join(__dirname, '..', 'tmp')));
app.use(errorHandler);

app.listen(3333, () => console.log("🎈🎈 Server started on port 3333!"));