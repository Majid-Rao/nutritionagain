const Customer = require('../models/customerModel.js');
// CREATE - Add a new customer
const createCustomer = async (req, res) => {
  try {
    const {
      fullName,
      email,
      gender,
      age,
      weight,
      weightUnit,
      location,
      maritalStatus,
      contactNumber,
      mainConcern,
      femaleFertilityHistory,
      maleFertilityHistory,
      medicalHistory,
      currentMedications,
      mealsPerDay,
      dietType,
      foodIntolerances,
      familyHistory,
      price
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !gender || !age || !weight || !weightUnit || !location || !contactNumber || !mainConcern) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Gender-specific validations
    if (gender === 'Female') {
      if (!maritalStatus) {
        return res.status(400).json({ error: 'Marital status is required for female customers' });
      }
      
      // Set isFemale flag
      if (femaleFertilityHistory) {
        femaleFertilityHistory.isFemale = true;
      }
    }

    if (gender === 'Male' && maleFertilityHistory) {
      maleFertilityHistory.isMale = true;
    }

    const newCustomer = new Customer({
      fullName,
      email,
      gender,
      age,
      weight,
      weightUnit,
      location,
      maritalStatus,
      contactNumber,
      mainConcern,
      femaleFertilityHistory,
      maleFertilityHistory,
      medicalHistory,
      currentMedications,
      mealsPerDay,
      dietType,
      foodIntolerances,
      familyHistory,
      status: 'pending',
      price,
    });

    const savedCustomer = await newCustomer.save();
    const simpleId = savedCustomer.generateSimpleId();

    res.status(201).json({
      message: 'Customer created successfully',
      customer: savedCustomer,
      simpleId
    });

  } catch (error) {
    console.error('Create customer error:', error);
    res.status(400).json({
      error: error.message || 'Error creating customer',
      details: error.errors
    });
  }
};

// READ - Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find()
      .select('-__v')
      .sort({ createdAt: -1 });
    
    const customersWithIds = customers.map(customer => ({
      ...customer.toObject(),
      simpleId: customer.generateSimpleId()
    }));

    res.status(200).json(customersWithIds);
  } catch (error) {
    console.error('Fetch customers error:', error);
    res.status(400).json({ error: 'Error fetching customers' });
  }
};

// READ - Get customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
      .select('-__v');

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const simpleId = customer.generateSimpleId();
    res.status(200).json({
      customer: customer.toObject(),
      simpleId
    });
  } catch (error) {
    console.error('Fetch customer error:', error);
    res.status(400).json({ error: 'Error fetching customer' });
  }
};
const getCustomerBySimpleId = async (req, res) => {
  try {
    // Debug log entire params object
    console.log('Request params:', req.params);
    
    const simpleId = req.params.simpleId;
    console.log('Raw simpleId:', simpleId, 'Type:', typeof simpleId);

    // Basic presence check
    if (!simpleId) {
      return res.status(400).json({
        error: 'Missing simple ID',
        details: 'No ID provided in URL'
      });
    }

    // Convert to string if needed (although it should already be a string)
    const idString = String(simpleId);
    console.log('Processed ID:', idString);

    // Validate format with more detailed feedback
    if (!idString.startsWith('user-')) {
      return res.status(400).json({
        error: 'Invalid simple ID format',
        details: 'ID must start with "user-"',
        received: idString
      });
    }

    // Extract and validate suffix
    const idSuffix = idString.slice(5); // Remove 'user-' prefix
    if (!idSuffix || idSuffix.length !== 5) {
      return res.status(400).json({
        error: 'Invalid simple ID format',
        details: 'ID must have exactly 5 characters after "user-"',
        received: idString,
        extractedSuffix: idSuffix
      });
    }

    // Find customer with matching ID suffix
    const customers = await Customer.find();
    console.log('Looking for suffix:', idSuffix);
    
    const customer = customers.find(c => {
      const customerSuffix = c._id.toString().slice(-5);
      console.log('Comparing with:', customerSuffix);
      return customerSuffix === idSuffix;
    });

    if (!customer) {
      return res.status(404).json({
        error: 'Customer not found',
        searchedId: idString,
        searchedSuffix: idSuffix
      });
    }

    res.status(200).json({
      success: true,
      customer: customer.toObject(),
      simpleId: customer.generateSimpleId()
    });

  } catch (error) {
    console.error('Error in getCustomerBySimpleId:', error);
    res.status(500).json({
      error: 'Server error while fetching customer',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// UPDATE - Update customer information
const updateCustomer = async (req, res) => {
  try {
    const updates = { ...req.body, updatedDate: Date.now() };

    // Gender-specific validations for updates
    if (updates.gender === 'Female' && !updates.maritalStatus) {
      return res.status(400).json({ error: 'Marital status is required for female customers' });
    }

    if (updates.gender === 'Female' && updates.femaleFertilityHistory) {
      updates.femaleFertilityHistory.isFemale = true;
    }

    if (updates.gender === 'Male' && updates.maleFertilityHistory) {
      updates.maleFertilityHistory.isMale = true;
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(200).json({
      message: 'Customer updated successfully',
      customer: updatedCustomer
    });
  } catch (error) {
    console.error('Update customer error:', error);
    res.status(400).json({
      error: error.message || 'Error updating customer',
      details: error.errors
    });
  }
};

// DELETE - Delete customer
const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    
    if (!deletedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(200).json({
      message: 'Customer deleted successfully',
      customerId: deletedCustomer.generateSimpleId()
    });
  } catch (error) {
    console.error('Delete customer error:', error);
    res.status(400).json({ error: 'Error deleting customer' });
  }
};

module.exports = { createCustomer, getAllCustomers, getCustomerById, getCustomerBySimpleId, updateCustomer, deleteCustomer };