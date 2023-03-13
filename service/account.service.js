const accountRepository = require('../repository/account.repository');

class AccountService {
    constructor(){}
    async getAccounts() {
        return await accountRepository.getAccounts();
    }
    async createAccount(account){
        return await accountRepository.createAccount(account);
    }
}

module.exports = new AccountService();