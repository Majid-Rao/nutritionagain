const Product = require('../models/productsModel');
const UploadCloudinary = require('../utils/fileUpload'); 

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const { name, shortDetail, longDetail, basePrice, category, variations } = req.body;

    // Cloudinary pe upload karo har image
    const images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await UploadCloudinary(file.path);
        if (result) {
          images.push(result.secure_url); // sirf URL save hoga DB mein
        }
      }
    }

    const product = await Product.create({
      name, shortDetail, longDetail, basePrice,
      category,
     variations: variations ? JSON.parse(variations) : [],// form-data mein string aata hai
      images
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name')
      .populate('variations.variation', 'name');
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Single Product
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name')
      .populate('variations.variation', 'name');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Edit Product
exports.editProduct = async (req, res) => {
  try {
    const { name, shortDetail, longDetail, basePrice, category, variations } = req.body;

    const updateData = {
      name, shortDetail, longDetail, basePrice, category,
       variations: variations ? JSON.parse(variations) : [],// form-data mein string aata hai
    };

    // Agar nai images aayi hain tabhi cloudinary pe upload karo
    if (req.files && req.files.length > 0) {
      const images = [];
      for (const file of req.files) {
        const result = await UploadCloudinary(file.path);
        if (result) {
          images.push(result.secure_url);
        }
      }
      updateData.images = images;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    })
      .populate('category', 'name')
      .populate('variations.variation', 'name');

    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};