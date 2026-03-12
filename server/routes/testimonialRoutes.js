const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {
  addTestimonial,
  getTestimonials,
  deleteTestimonial,
} = require("../controllers/testimonialController");

const router = express.Router();

// ✅ Choose folder based on environment
const dir =
  process.env.NODE_ENV === "production"
    ? "/tmp/testimonials"
    : path.join(__dirname, "../uploads/testimonials");

// ✅ Safely create directory if not exists
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// ✅ Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
// ✅✅✅ IMAGE SERVE KARNE KA ROUTE ✅✅✅
router.get("/image/:filename", (req, res) => {
  const { filename } = req.params;
  const filepath = path.join(dir, filename);

  // Check if file exists
  if (fs.existsSync(filepath)) {
    res.sendFile(filepath);
  } else {
    res.status(404).json({ message: "Image not found" });
  }
});
// ✅ Routes
router.post("/addtestimonial", upload.single("image"), addTestimonial);
router.get("/gettestimonials", getTestimonials);
router.delete("/deletetestimonial/:id", deleteTestimonial);

module.exports = router;
