import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cors from 'cors';

import { DB_URL, PORT } from './constants/index.js';
import checkErrors from './errors/checkErrors.js';
import { errorLogger, requestLogger } from './middlewares/logger.js';
import limiter from './rateLimit.js';
import routes from './routes/index.js';
import optionsCORS  from '../src/utils/constants.js';

await mongoose.connect(DB_URL);
console.log('MongoDB connected');

const app = express();

app.use(cors(optionsCORS));
app.use(limiter);
app.use(helmet());

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger); // подключаем логгер запросов
app.use(routes);
app.use(errorLogger); // подключаем лоcoггер ошибок

app.use(errors());
app.use((err, req, res, next) => {
  checkErrors(err, res, next);
});
app.listen(PORT);
