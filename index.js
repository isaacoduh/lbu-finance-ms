const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();


const indexRouter = require('./routes/index');

// const accountController = require('./controller/account.controller');

const app = express();
app.use(cors())
const port = process.env.PORT || 3500;

app.use(bodyParser.json());
// app.use(morgan('dev'));
morgan.token('body', req => {
  return JSON.stringify(req.body);
})
app.use(morgan(':method :url :body'))

app.use('/api/v1/',indexRouter);



// app.get('/api/accounts', (req, res) => {
//     accountController.getAccounts().then(data => {
//         res.json(data).status(200);
//     });
// });

// app.post('/api/accounts', (req, res) => {
//     const {studentId} = req.body;
//     accountController.createAccount(req.body).then(data => {
//         res.json(data).status(200);
//     });
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).send({ error: 'Not found' })
  });
  
  // error handler
//   app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//     res.status(err.status || 500).send({ error: err })
//   });

app.listen(port, () => {
    console.log(`Server listening on the port ${port}`);
})


// module.exports = app;
