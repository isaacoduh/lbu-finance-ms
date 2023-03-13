const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const accountController = require('./controller/account.controller');

const app = express();
const port = process.env.PORT || 3500;

app.use(bodyParser.json());

app.get('/api/accounts', (req, res) => {
    accountController.getAccounts().then(data => {
        res.json(data).status(200);
    });
});

app.post('/api/accounts', (req, res) => {
    const {studentId} = req.body;
    accountController.createAccount(req.body).then(data => {
        res.json(data).status(200);
    });
});

app.listen(port, () => {
    console.log(`Server listening on the port ${port}`);
})