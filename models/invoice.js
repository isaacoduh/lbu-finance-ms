'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.belongsTo(models.Account, {
        foreignKey: 'acountId',
        as:'account'
      });
    }
  }
  Invoice.init({
    reference: DataTypes.STRING,
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
    accountId: {
      type: DataTypes.BIGINT
    }
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};