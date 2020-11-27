import dotenv from 'dotenv';

dotenv.config();

export const frontend = {
  URL: {
    activeEmail: `${process.env.FRONTEND_URL}active-email?token=%s`,
    resetPass: `${process.env.FRONTEND_URL}reset-pass?token=%s`,
  },
};

export const config = {
  env: process.env.NODE_ENV,
  bugsbag: process.env.BUGSNAG_API_KEY ?? '3e34070a24af2d643b1ea24d1218d4b9',
  versionCode: '0.0.1',
};

const CORS_ORIGIN = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : [];

export const cors = {
  credentials: true,
  origin: CORS_ORIGIN,
};
