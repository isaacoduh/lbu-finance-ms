const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // Import the Sequelize instance

const Account = sequelize.define('Account', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hasOutstandingBalance: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Define one-to-many relationship between Account and Invoice models
Account.hasMany(require('./invoice'), { foreignKey: 'accountId', as: 'invoices' });

module.exports = Account;

// ================================================================================
// models/invoice.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // Import the Sequelize instance

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  uniqueReference: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('LIBRARY_FINE', 'TUITION_FEES'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('OUTSTANDING', 'PAID', 'TYPE'),
    allowNull: false,
  },
});




const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Import the Sequelize instance

const Account = sequelize.define('Account', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hasOutstandingBalance: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Define one-to-many relationship between Account and Invoice models
Account.hasMany(require('./invoice.model'), { foreignKey: 'accountId', as: 'invoices' });

module.exports = Account;


// models/invoice.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Import the Sequelize instance

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  uniqueReference: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('LIBRARY_FINE', 'TUITION_FEES'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('OUTSTANDING', 'PAID', 'TYPE'),
    allowNull: false,
  },
});

// Define many-to-one relationship between Invoice and Account models
Invoice.belongsTo(require('./account.model'), { foreignKey: 'accountId', as: 'account' });

module.exports = Invoice;


// Define many-to-one relationship between Invoice and Account models
Invoice.belongsTo(require('./account'), { foreignKey: 'accountId', as: 'account' });

module.exports = Invoice;
