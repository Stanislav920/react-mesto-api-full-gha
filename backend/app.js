require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

const centralizedHandler = require('./middlewares/centralizedHandler');

const { loginUser, createUser } = require('./controllers/users');
const { validateUserAuth, validateUserRegister, } = require('./utils/validation');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');

const NotFoundError = require('./utils/repsone-errors/NotFoundError');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логгер
app.use(requestLogger);

// Cors
app.use(cors);

// Краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateUserAuth, loginUser);
app.post('/signup', validateUserRegister, createUser);

app.use(auth);

app.use(router);

app.use((req, res, next) => {
  next(new NotFoundError('Порт не существует'));
});

// Ошибки логгера
app.use(errorLogger);

// Обрабочек ответа.
app.use(errors());
app.use(centralizedHandler);

app.listen(PORT, () => console.log('Сервер запущен!'));
