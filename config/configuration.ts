const DEFAULT_PORT = 3000;
const DEFAULT_API_VERSION = 'v1';
const DEFAULT_API_PREFIX = `api/${DEFAULT_API_VERSION}`;

export default () => ({
  port: +process.env.PORT || DEFAULT_PORT,
  api: {
    version: process.env.API_VERSION || DEFAULT_API_VERSION,
    prefix: process.env.API_PREFIX || DEFAULT_API_PREFIX,
  },
  otp_max_attempts: +process.env.OTP_MAX_ATTEMPTS || 5,
  JWT_SECRET: process.env.JWT_SECRET,
  database: {
    type: process.env.DATABASE_TYPE || 'mysql',
    uri:
      process.env.CLEARDB_DATABASE_URL ||
      process.env.TYPEORM_URI ||
      (function () {
        return `${this.type}://${this.user}:${this.password}@${this.host}:${this.port}/${this.name}`;
      })(),
    host: process.env.DATABASE_HOST || 'localhost',
    port: +process.env.DATABASE_PORT || 3306,
    name: process.env.DATABASE_DATABASE || 'pesewarise',
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || '',
    synchronize: process.env.TYPEORM_SYNCHRONIZE || false,
    dropSchema: process.env.TYPEORM_DROPSCHEMA || false,
  },
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
    personalPhoneNumber: process.env.PERSONAL_PHONE_NUMBER,
  },
});
