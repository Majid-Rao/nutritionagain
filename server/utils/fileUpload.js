const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "aisha",
    });

    // upload ke baad local file remove
    fs.unlinkSync(localFilePath);

    return result;
  } catch (err) {
    console.error("CLOUDINARY ERROR:", err.message);
    return null;
  }
};

module.exports = UploadCloudinary;