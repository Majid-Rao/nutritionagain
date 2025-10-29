const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const programController = require('../controllers/programController');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Add program (image & optional video)
router.post('/addprogram', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), programController.createProgram);

// Get all programs
router.get('/getprograms', programController.getAllPrograms);

// Get single program
router.get('/getprogram/:id', programController.getOneProgram);

// Update program
router.put('/updateprogram/:id', upload.fields([{ name: 'image' }, { name: 'video' }]), programController.updateProgram);

// Delete program
router.delete('/deleteprogram/:id', programController.deleteProgram);

module.exports = router;
