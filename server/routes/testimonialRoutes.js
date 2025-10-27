const express = require("express");
const multer = require("multer");
const fs = require("fs");
const {
  addTestimonial,
  getTestimonials,
  deleteTestimonial,
} = require("../controllers/testimonialController");

const router = express.Router();

const dir = "uploads/testimonials";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/testimonials"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post("/addtestimonial", upload.single("image"), addTestimonial);
router.get("/gettestimonials", getTestimonials);
router.delete("/deletetestimonial/:id", deleteTestimonial);

module.exports = router;
