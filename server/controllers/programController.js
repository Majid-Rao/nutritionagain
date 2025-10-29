const Program = require('../models/programModel'); 
const path = require('path');
const fs = require('fs');

// Create a new program
exports.createProgram = async (req, res) => {
  try {
    const { heading, description, content } = req.body;
    let image = null;
    let video = null;

    // Check if files are uploaded
    if (req.files) {
      if (req.files['image']) {
        image = req.files['image'][0].filename;
      }
      if (req.files['video']) {
        video = req.files['video'][0].filename;
      }
    }

    const newProgram = new Program({
      heading,
      description,
      content,
      image,
      video
    });

    await newProgram.save();
    res.status(201).json({ message: 'Program created successfully', program: newProgram });
  } catch (error) {
    res.status(500).json({ message: 'Error creating program', error });
  }
};

// Get all programs
exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching programs', error });
  }
};

// Get one program by id
exports.getOneProgram = async (req, res) => {
  const { id } = req.params;
  try {
    const program = await Program.findById(id);
    if (!program) return res.status(404).json({ message: 'Program not found' });
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the program', error });
  }
};

// Update a program by ID
exports.updateProgram = async (req, res) => {
  const { id } = req.params;
  const { heading, description, content } = req.body;

  let image = req.files && req.files['image'] ? req.files['image'][0].filename : null;
  let video = req.files && req.files['video'] ? req.files['video'][0].filename : null;

  try {
    const updatedProgram = await Program.findByIdAndUpdate(
      id,
      { heading, description, content, image, video },
      { new: true }
    );

    if (!updatedProgram) return res.status(404).json({ message: 'Program not found' });
    res.status(200).json({ message: 'Program updated successfully', program: updatedProgram });
  } catch (error) {
    res.status(500).json({ message: 'Error updating program', error });
  }
};

// Delete a program by ID
exports.deleteProgram = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProgram = await Program.findByIdAndDelete(id);
    if (!deletedProgram) return res.status(404).json({ message: 'Program not found' });

    // Optionally delete files
    if (deletedProgram.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', deletedProgram.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting image:', err);
      });
    }
    if (deletedProgram.video) {
      const videoPath = path.join(__dirname, '..', 'uploads', deletedProgram.video);
      fs.unlink(videoPath, (err) => {
        if (err) console.error('Error deleting video:', err);
      });
    }

    res.status(200).json({ message: 'Program deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting program', error });
  }
};
