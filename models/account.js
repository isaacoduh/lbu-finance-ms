const {Sequelize} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define("Account",{
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      unique: true,
      primaryKey: true
  },
    studentId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    hasOutstandingBalance: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },{paraniod: true});

  Account.associate = function (models) {
    Account.hasMany(models.Invoice, {
      as: 'invoices',
      onDelete:'cascade',
      foreignKey:'account_id'
    });
  }

  return Account;
}


// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Account extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Account.hasMany(models.Invoice,{
//         foreignKey:'accountId',
//         as:'invoices'
//       })
//     }
//   }
//   Account.init({
//     studentId: DataTypes.STRING,
//     hasOutstandingBalance: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'Account',
//   });
//   return Account;
// };