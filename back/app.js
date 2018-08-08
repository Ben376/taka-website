import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express from 'express';
import logger from 'morgan';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import passport from 'passport';
import bcrypt from 'bcrypt';
import passportJwt from 'passport-jwt';
// import favicon from 'serve-favicon';

import apiRouter from './routes/api';
import sqlRouter from './routes/sql';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import insertData from './routes/insertData';


const LocalStrategy = require('passport-local').Strategy;

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;
const connection = require('./helpers/sql');

const app = express();
const debug = Debug('bdx-0218-js-taka:app');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/sql', sqlRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/insertData', insertData);
// Droit d'accès JWT
app.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(req.user);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

// PASSPORT
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, (email, password, cb) => {
  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) {
      return cb(err);
    }
    if (result && result.length > 0) {
      const isSame = bcrypt.compareSync(password, result[0].password);
      if (email !== result[0].email || isSame !== true) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }
      return cb(null, result[0]);
    }
    return cb(null, false, { message: 'Incorrect email or password.' });
  });
}));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 's3cr3t'
}, (jwtPayload, cb) => cb(null, jwtPayload)
));

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err);
  process.exit(1);
});

export default app;
