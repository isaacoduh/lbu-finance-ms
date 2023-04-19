const db = require('../models');
const Account = db.accounts;

const getAllAccounts = async (req, res) => {
    const accounts = await Account.findAll({});

    return res.json(accounts);
}

module.exports = {getAllAccounts}

// const Account = require('../models/account');
// const Invoice = require('../models/invoice').Invoice;


// module.exports = {
//     list(req, res) {
//         return Account.findAll({
//             include: [{
//                 model: Invoice,
//                 as: 'invoices'
//             }],
//             order: [
//                 ['createdAt','DESC'],
//                 [{model: Invoice, as: 'invoices'}, 'createdAt','DESC'],
//             ],
//         })
//         .then((accounts) => res.status(200).send(accounts))
//         .catch((error) => {res.status(400).send(error);})
//     }
// }