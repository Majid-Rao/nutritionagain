const express = require('express');
const router = express.Router();
const {
  addCategory,
  getAllCategories,
  getSingleCategory,
  editCategory,
  deleteCategory
} = require('../controllers/categoryController');

router.post('/addCategory',addCategory);
router.get('/getAllCategories',getAllCategories);
router.get('/getSingleCategory/:id', getSingleCategory);
router.patch('/editCategory/:id', editCategory);
router.delete('/deleteCategory/:id',deleteCategory);

module.exports = router;