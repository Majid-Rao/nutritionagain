const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  addProduct, getAllProducts,
  getSingleProduct, editProduct, deleteProduct
} = require('../controllers/productsController');

const upload = multer({ dest: 'uploads/' }); // apna storage configure karo

router.post('/addProduct',      upload.array('images', 5), addProduct);
router.get('/getAllProducts',       getAllProducts);
router.get('/getSingleProduct/:id',    getSingleProduct);
router.patch('/editProduct/:id',    upload.array('images', 5), editProduct);
router.delete('/deleteProduct/:id', deleteProduct);

module.exports = router;