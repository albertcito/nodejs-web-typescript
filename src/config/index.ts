const frontend = {
  URL: {
    activeEmail: `${process.env.FRONTEND_URL}active-email?token=%s`,
    resetPass: `${process.env.FRONTEND_URL}reset-pass?token=%s`,
  },
};

export default frontend;
