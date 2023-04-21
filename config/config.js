require('dotenv').config();

const config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    // operatorsAliases: '0',
    //     // use_env_variable: "DATABASE_URL",
    //     dialectOptions: {
    //       ssl: {
    //         // require: true,
    //         rejectUnauthorized: false
    //       }
    //     },
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        // require: true,
        rejectUnauthorized: false
      }
    },
    logging: false, // disable logging; default: console.log
    // use_env_variable: "DATABASE_URL"
  },
};

// For other environments
if (!['production', 'development'].includes(process.env.NODE_ENV)) {
  config[process.env.NODE_ENV] = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorsAliases: '0',
    logging: false, // disable logging; default: console.log
  };
}
module.exports = config;