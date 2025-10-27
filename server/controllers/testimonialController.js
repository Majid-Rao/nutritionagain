const Testimonial = require("../models/testimonial");

// Add new testimonial
exports.addTestimonial = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }
  try {
    const newTestimonial = new Testimonial({
      imageUrl: `/uploads/testimonials/${req.file.filename}`,
      category: req.body.category,
    });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get testimonials (with category, limit & shuffle)
exports.getTestimonials = async (req, res) => {
  try {
    const { category } = req.query;
    const limit = parseInt(req.query.limit) || 15;

    const query = category ? { category } : {};
    let data = await Testimonial.find(query);

    // Shuffle
    data = data.sort(() => Math.random() - 0.5);

    // Apply limit
    const limitedData = limit ? data.slice(0, limit) : data;

    res.json(limitedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Delete testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial)
      return res.status(404).json({ message: "Testimonial not found" });

    res.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
