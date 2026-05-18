const express = require('express');
const router = express.Router();
const {
  addVariation,
  getAllVariations,
  getSingleVariation,
  editVariation,
  deleteVariation
} = require('../controllers/variationController');

router.post('/addVariation',addVariation);
router.get('/getAllVariations',getAllVariations);
router.get('/getSingleVariation/:id',getSingleVariation);
router.patch('/editVariation/:id',editVariation);
router.delete('/deleteVariation/:id',deleteVariation);

module.exports = router;