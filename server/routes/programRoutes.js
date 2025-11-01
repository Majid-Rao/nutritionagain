const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const programController = require('../controllers/programController');

// Create uploads directory if it doesn't exist
const dir = process.env.NODE_ENV === "production"
  ? "/tmp/programs"
  : path.join(__dirname, "../uploads/programs");

// Safely create directory
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Configure multer
const upload = multer({ storage });


// Error handling middleware
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        status: 'error',
        message: 'File too large. Max size is 100MB'
      });
    }
    return res.status(400).json({
      status: 'error',
      message: err.message
    });
  }
  next(err);
};

// Routes with error handling
router.post("/addprogram", 
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]), 
  programController.createProgram
);

router.get('/getprograms', programController.getAllPrograms);

router.get('/getprogram/:id', programController.getOneProgram);

router.put('/updateprogram/:id',
  (req, res, next) => {
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'video', maxCount: 1 }
    ])(req, res, (err) => {
      if (err) {
        handleUploadError(err, req, res, next);
      } else {
        next();
      }
    });
  },
  programController.updateProgram
);

router.delete('/deleteprogram/:id', programController.deleteProgram);

// Global error handler
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

module.exports = router;