const DEFAULT_PORT = 3000;

export default () => ({
  port: +process.env.PORT || DEFAULT_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  database: {
    type: 'mysql',
    uri: process.env.MYSQL_URL || process.env.TYPEORM_URI,
  },
});
