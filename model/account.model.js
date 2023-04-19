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