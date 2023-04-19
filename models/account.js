'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.hasMany(models.Invoice, {foreignKey: 'accountId'});
    }
  }
  Account.init({
    studentId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hasOutstandingBalance: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};