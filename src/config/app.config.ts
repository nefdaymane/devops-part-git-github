export const AppConfig = () => ({
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce',
  port: parseInt(process.env.PORT, 10) || 3000,
  baseUrl: process.env.BASE_URL || 'http://localhost',
  apiPrefix: process.env.API_PREFIX || 'api/v1',
});
