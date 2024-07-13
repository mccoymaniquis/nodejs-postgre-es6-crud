import dotenv from 'dotenv'
dotenv.config()

export const app = {
  environment: process.env.APP_ENVIRONMENT,
  name: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
  version: process.env.APP_VERSION,
  host: process.env.APP_HOST,
  port: process.env.APP_PORT,
  clientId: process.env.APP_CLIENT_ID,
  clientSecret: process.env.APP_CLIENT_SECRET,
}

export const database = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}
