const Advertisement = require("../models/Advertisement");
const { successResponse } = require("../utils/responseHelper");

// Create a new advertisement
exports.createAd = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // Generate the image URL from the uploaded file's filename
    const imageUrl = `/uploads/${req.file.filename}`;

    // Create a new advertisement record in the database
    const ad = await Advertisement.create({ title, description, imageUrl });
    return successResponse(res, "success", ad, 200);
  } catch (error) {
    next(error);
  }
};

// Get all advertisements
exports.getAds = async (req, res, next) => {
  try {
    // Fetch all advertisement records from the database
    const ads = await Advertisement.findAll();

    return successResponse(res, "success", ads, 200);
  } catch (error) {
    next(error);
  }
};
