var express = require('express')
var router = express.Router();


const accountController = require('../controllers').account;
const invoiceController = require('../controllers').invoice;


router.get('/roost', function(req, res, next) {
    res.json({message: 'Welcome to Finance'})
  });

// account router

router.get('/accounts', accountController.getAllAccounts);
router.post('/accounts', accountController.createAccount);
router.get('/accounts/student/:studentId', accountController.getAccountByStudentId);
router.put('/accounts/:id', accountController.updateAccountById);
router.delete('/accounts/:id',accountController.deleteAccountById);

router.get('/invoices', invoiceController.getAllInvoices);
router.post('/invoices',invoiceController.createInvoice);
router.get('/invoices/:id', invoiceController.getInvoiceById);
router.get('/invoices/references/:reference',invoiceController.getInvoiceByReference);
router.put('/invoices/:reference/pay', invoiceController.payInvoiceByReference);
router.put('/invoices/:reference/cancel', invoiceController.cancelInvoiceByReference);



module.exports = router;