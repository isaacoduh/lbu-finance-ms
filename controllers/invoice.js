const {Account, Invoice} = require('../models');
const {uuid} = require('uuidv4');

const getAllInvoices = async (req, res) => {
    const invoices = await Invoice.findAll({});

    res.status(201).send({status: true, message: "All Invoices!", data: invoices})
}

const getInvoiceById = async (req, res) => {
    try {
        const {id} = req.params;

        const invoice = await Invoice.findByPk(id);

        if(!invoice) {
            return res.status(404).json({ error: 'Invoice with Id not found' });
        }

        return res.status(201).send({status: true, message: "Invoice Retrieved!", data: invoice}); 
    } catch (error) {
        
    }
}

const createInvoice = async(req, res) => {
    try {
        // console.log(req.body);
        const {reference, amount, type, status} = req.body;
        const {studentId} = req.body.account;
        
        // // check if the studentId is valid or exists
        const account = await Account.findOne({where: {studentId}});

        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        var date = new Date();

        console.log(`.... account: ${account}`)
        console.log(`type: ${type}`)

        const invoice = await Invoice.create({
            // reference: uuid(),
            reference: reference,
            amount: amount,
            account_id: account.id,
            dueDate: date.setDate(date.getDate() + 7),
            type: type,
            status: status
        });

        if(invoice){
            return res.status(201).send({status: true, message: "Invoice Created!", data: invoice});
        }

    } catch (error) {
        console.log(error);
    }
}

const getInvoiceByReference = async (req, res) => {
    try {
        const {reference} = req.params;
        const invoice = await Invoice.findOne({
            where: {reference: reference}
        });
        if(!invoice){
            return res.status(404).send({status: false, message: 'Invoice not found!'})
        }

        return res.status(200).send({status: true, message: 'Invoice Retrieved!', data: invoice});
    } catch (error) {
        console.log(error);
    }
}

const payInvoiceByReference = async (req, res) => {
    try {
        const {reference} = req.params;
        const invoice = await Invoice.findOne({
            where: {reference: reference}
        });
        if(!invoice){
            return res.status(404).send({status: false, message: 'Invoice not found!'})
        }

        invoice.status = 'PAID';
        invoice.save();

        return res.status(200).send({status: true, message: 'Invoice Paid!', data: invoice});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const cancelInvoiceByReference = async (req, res) => {
    try {
        const {reference} = req.params;
        const invoice = await Invoice.findOne({
            where: {reference: reference}
        });
        if(!invoice){
            return res.status(404).send({status: false, message: 'Invoice not found!'})
        }

        invoice.status = 'CANCELLED';
        invoice.save();

        return res.status(200).send({status: true, message: 'Invoice Cancelled!', data: invoice});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllInvoices,
    createInvoice, 
    getInvoiceById,
    getInvoiceByReference,
    payInvoiceByReference,
    cancelInvoiceByReference
};