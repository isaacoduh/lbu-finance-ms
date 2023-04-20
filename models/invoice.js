const {Sequelize} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define("Invoice",{
    reference: Sequelize.STRING,
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    dueDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ['LIBRARY_FINE', 'TUITION_FEES']
    },
    status: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ['OUTSTANDING', 'PAID', 'CANCELLED']
    },
    account_id: {
      type: Sequelize.INTEGER,
      required: true,
      allowNull: false
    }
  },{paranoid: true});


  Invoice.associate = function(models) {
    Invoice.belongsTo(models.Account,{
      as: 'account',
      foreignKey: 'account_id',
      onDelete: 'cascade'
    });
  };
  
  return Invoice;
}
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Invoice extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Invoice.belongsTo(models.Account, {
//         foreignKey: 'acountId',
//         as:'account'
//       });
//     }
//   }
//   Invoice.init({
//     reference: DataTypes.STRING,
//     amount: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     dueDate: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     type: {
//       type: DataTypes.ENUM('LIBRARY_FINE', 'TUITION_FEES'),
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.ENUM('OUTSTANDING', 'PAID', 'TYPE'),
//       allowNull: false,
//     },
//     accountId: {
//       type: DataTypes.BIGINT
//     }
//   }, {
//     sequelize,
//     modelName: 'Invoice',
//   });
//   return Invoice;
// };