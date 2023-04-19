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
