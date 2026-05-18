const express = require('express');
const router  = express.Router();
const {
  addOrder,
  getAllOrders,
  getSingleOrder,
  editOrder,
  deleteOrder,
} = require('../controllers/productOrderController.js');

router.post('/addOrder',      addOrder);
router.get('/getAllOrders',       getAllOrders);
router.get('/getSingleOrder/:id',    getSingleOrder);
router.patch('/editOrder/:id',    editOrder);
router.delete('/deleteOrder/:id', deleteOrder);

module.exports = router;