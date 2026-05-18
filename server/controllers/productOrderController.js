const productsOrder        = require('../models/productOrderModel.js');
const sendOrderEmail = require('../utils/pmailer.js');

// ── Add Order ──────────────────────────────────────────────────────────────
exports.addOrder = async (req, res) => {
  try {
    const {
      customerName, customerEmail, customerPhone,
      customerAddress, customerCity, customerNote,
      products, paymentMethod
    } = req.body;

    const enrichedProducts = products.map(p => ({
      ...p,
      subtotal: p.price * p.quantity,
    }));

    const totalAmount = enrichedProducts.reduce((sum, p) => sum + p.subtotal, 0);
    
    const newOrder = await productsOrder.create({
      customerName, customerEmail, customerPhone,
      customerAddress, customerCity, customerNote,
      products: enrichedProducts,
      totalAmount,
      paymentMethod: paymentMethod || 'cod',
    });

    sendOrderEmail(newOrder);

    res.status(201).json({ success: true, message: 'Order placed successfully!', order: newOrder });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ── Get All Orders ─────────────────────────────────────────────────────────
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await productsOrder.find()
      .populate('products.product', 'name images')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── Get Single Order ───────────────────────────────────────────────────────
exports.getSingleOrder = async (req, res) => {
  try {
    const order = await productsOrder.findById(req.params.id)
      .populate('products.product', 'name images');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── Edit Order (status update mostly) ─────────────────────────────────────
exports.editOrder = async (req, res) => {
  try {
    const {
      orderStatus, paymentStatus, paymentMethod,
      customerName, customerEmail, customerPhone,
      customerAddress, customerCity, customerNote,
    } = req.body;

    const updateData = {};
    if (orderStatus)     updateData.orderStatus     = orderStatus;
    if (paymentStatus)   updateData.paymentStatus   = paymentStatus;
    if (paymentMethod)   updateData.paymentMethod   = paymentMethod;
    if (customerName)    updateData.customerName    = customerName;
    if (customerEmail)   updateData.customerEmail   = customerEmail;
    if (customerPhone)   updateData.customerPhone   = customerPhone;
    if (customerAddress) updateData.customerAddress = customerAddress;
    if (customerCity)    updateData.customerCity    = customerCity;
    if (customerNote !== undefined) updateData.customerNote = customerNote;

    const order = await productsOrder.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true })
      .populate('products.product', 'name images');

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ── Delete Order ───────────────────────────────────────────────────────────
exports.deleteOrder = async (req, res) => {
  try {
    const order = await productsOrder.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.status(200).json({ success: true, message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};