
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define("Account",{
    studentId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hasOutstandingBalance: false
  },{timestamps: true});

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