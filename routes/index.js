var express = require('express')
var router = express.Router();


const accountController = require('../controllers').account;


router.get('/roost', function(req, res, next) {
    res.json({message: 'Welcome to Finance'})
  });

// account router

router.get('/accounts', accountController.getAllAccounts);


module.exports = router;