const DEFAULT_PORT = 3000;

export default () => ({
  port: +process.env.PORT || DEFAULT_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  database: {
    type: 'mysql',
    uri: process.env.MYSQL_URL || process.env.TYPEORM_URI,
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
