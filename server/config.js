const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/code-challenge',
  port: process.env.PORT || 8000,
  secretKey: process.env.KEY || 'mySuperSecretKey',
};

export default config;
