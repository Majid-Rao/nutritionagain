const Variation = require('../models/variatonModel.js');

exports.addVariation = async (req, res) => {
  try {
    const variation = await Variation.create({ name: req.body.name });
    res.status(201).json({ success: true, variation });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAllVariations = async (req, res) => {
  try {
    const variations = await Variation.find();
    res.status(200).json({ success: true, variations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSingleVariation = async (req, res) => {
  try {
    const variation = await Variation.findById(req.params.id);
    if (!variation) return res.status(404).json({ success: false, message: 'Variation not found' });
    res.status(200).json({ success: true, variation });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.editVariation = async (req, res) => {
  try {
    const variation = await Variation.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true, runValidators: true }
    );
    if (!variation) return res.status(404).json({ success: false, message: 'Variation not found' });
    res.status(200).json({ success: true, variation });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteVariation = async (req, res) => {
  try {
    const variation = await Variation.findByIdAndDelete(req.params.id);
    if (!variation) return res.status(404).json({ success: false, message: 'Variation not found' });
    res.status(200).json({ success: true, message: 'Variation deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};