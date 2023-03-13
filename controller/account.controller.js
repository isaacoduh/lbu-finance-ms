const accountService = require('../service/account.service');
const logger = require('../logger/api.logger');


class AccountController {

    async getAccounts() {
        logger.info('Controller: get accounts')
        return await accountService.getAccounts();
    }

    async createAccount(account) {
        logger.info('Controller: create accounts', account);
        return await accountService.createAccount(account);
    }
}

module.exports = new AccountController();