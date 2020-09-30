import redis from 'redis';
import session from "express-session";
import connectRedis from 'connect-redis';

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

export const redisSession: session.SessionOptions =  {
  store: new RedisStore({
    client: redisClient,
    disableTouch: true,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years,
    httpOnly: true,
    secure: false,
    sameSite: 'lax', // csrf
  },
  saveUninitialized: false,
  resave: false,
  secret: 'alsdlsakd :)',
  name: 'qid',
};