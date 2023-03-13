module.exports = (sequelize, DataTypes, Model) => {
    class Account extends Model {}
    Account.init({
        studentId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hasOutstandingBalance: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },{
        sequelize,
        modelName: 'account'
    });

    return Account;
};