const creds = {
    development: {
      username: 'root',
      password: 'root',
      database: 'finance-ms-dev',
      host: 'localhost',
      dialect: 'postgresql'
    },
    test: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOSTNAME,
      dialect: 'postgresql'
    },
    production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOSTNAME,
      dialect: 'postgresql'
    }
  };
  
  module.exports = creds;