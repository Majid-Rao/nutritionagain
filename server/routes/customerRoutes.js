const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Create a new customer
router.post('/addcustomer', customerController.createCustomer);

// Get all customers
router.get('/getcustomers', customerController.getAllCustomers);

// Get a customer by ID
router.get('/getcustomer/:id', customerController.getCustomerById);
// Get a customer by simplified ID
router.get('/getcustomer/simpleId/:simpleId', customerController.getCustomerBySimpleId);

// Update a customer
router.put('/updatecustomer/:id', customerController.updateCustomer);

// Delete a customer
router.delete('/deletecustomer/:id', customerController.deleteCustomer);

module.exports = router;
