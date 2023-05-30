const DEFAULT_PORT = 3000;

export default () => ({
  port: +process.env.PORT || DEFAULT_PORT,
  JWT_SECRET: 'N0!@e',
  database: {
    type: 'mysql',
    uri: process.env.CLEARDB_DATABASE_URL || process.env.TYPEORM_URI,
  },
});
