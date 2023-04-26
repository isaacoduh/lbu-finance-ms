// const db = require('../models');
// const Account = db.accounts;
const {Account, Invoice} = require('../models');

const getAllAccounts = async (req, res) => {
    const accounts = await Account.findAll({});

    return res.json(accounts);
}

const createAccount = async (req, res) => {
    try {
        const {studentId} = req.body;

        // check if account with the student Id exists already
        const check = await Account.findOne({where: {studentId: studentId}});

        if(check) {
            return res.status(500).send({status: false, message: "Account Exists Already!"});
        }

        const newaccount = await Account.create({
            studentId: studentId,
            hasOutstandingBalance: false,
        });

        if(newaccount){
            return res.status(201).send({status: true, message: "Account Created!", data: newaccount});
        }
    } catch (error) {
        console.log(error);
    }
}

const getAccountByStudentId = async (req, res) => {
    try {
        const {studentId} = req.params;
        const account = await Account.findOne({
            where: {studentId: studentId},
            include: { model: Invoice, as: 'invoices' }
        });

        if(account) {
            return res.status(201).send({status: true, message: "Data Retrieved", data: account});
        }
    } catch (error) {
        console.log(error);
    }
}

const checkGraduationStatus = async(req, res) => {
    try {
        const studentId = req.params.studentId;
        const account = await Account.findOne({
            where: {studentId: studentId},
            include: { model: Invoice, as: 'invoices' }
        });

        // if(account) {
        //     return res.status(201).send({status: true, message: "Data Retrieved", data: account});
        // }

        const hasOutstandingBalance = await Invoice.count({
            where: {account_id: account.id, status: 'OUTSTANDING'}
        });

        // return res.json({ hasOutstandingBalance: invoiceCount === 0 ? false : true });
        // return res.status(200).send({
        //     hasOutstandingBalance: invoiceCount === 0 ? false : true
        // });
        return res.status(200).send( hasOutstandingBalance === 0 ? false : true)

    } catch (error) {
        console.log(error);
    }
}

const getAccountById = async (req, res) => {
    try {
        const {id} = req.params;
        const account = await Account.findOne({
            where: {id: id}
        });

        if(account) {
            return res.status(201).send({status: true, message: "Data Retrieved", data: account});
        }
    } catch (error) {
        
    }
}

const updateAccountById = async (req, res) => {
    try {
        const {id} = req.params;
        // check if the account exists
        const checkAccount = await Account.findOne({
            where: {id:id}
        });

        if(!checkAccount) {
            return res.status(404).send({status: false, message: 'Account not found!'});
        }

        const {studentId, hasOutstandingBalance} = req.body;

        checkAccount.studentId = studentId;
        checkAccount.hasOutstandingBalance = hasOutstandingBalance;

        await checkAccount.save();

        return res.status(200).send({status: true, message: "Account Updated!", data: checkAccount});

    } catch (error) {
        console.log(error)
    }
}

const deleteAccountById = async (req, res) => {
    try {
        const {id} = req.params;
        
        // Find account by id
        const account = await Account.findByPk(id);

        // If Account not found, return error response
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
  
        // Delete the Account
        await account.destroy();
  
      // Return success response
      return res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllAccounts,
    createAccount, 
    getAccountByStudentId,
    getAccountById,
    updateAccountById,
    deleteAccountById,
    checkGraduationStatus
}

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