const getCors = () => ({
  origin: process.env.FRONTEND_URL,
  credentials: true,
});
export default getCors;
