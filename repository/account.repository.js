const {connect} = require('../config/db.config');
const logger = require('../logger/api.logger');


class AccountRepository {
    database = {};

    constructor() {
        this.database = connect();
        this.database.sequelize.sync({force: true}).then(() => {
            console.log('Drop and resync database');
        });
    }

    async getAccounts(){
        try {
            const accounts = await this.database.accounts.findAll();
            console.log('accounts:::',accounts);
            return accounts;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async createAccount(account) {
        let data = {};
        try {
            data = await this.database.accounts.create(account);
        } catch (error) {
            logger.error('Error::', + error);
        }
        return data;
    }
}

module.exports = new AccountRepository();