const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

// Insert a Photo, with an user related to it
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  // Create a photo

  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  // If photo was created successfully, return data
  if (!newPhoto) {
    res
      .status(422)
      .json({ errors: ["There was a problem, please try again later"] });
    return;
  }

  res.status(201).json(newPhoto);
};

// Remove a photo from DB

const deletePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ errors: ["Invalid photo ID"] });
  }

  try {
    const photo = await Photo.findById(id);

    if (!photo) {
      return res.status(404).json({ errors: ["Photo not found!"] });
    }

    // Check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      return res
        .status(403)
        .json({ errors: ["An error has occurred, please try again later"] });
    }

    await Photo.deleteOne();

    return res
      .status(200)
      .json({ id: photo._id, message: "Photo deleted successfully." });
  } catch (error) {
    return res.status(500).json({ errors: ["Photo not found!"] });
  }
};

// Get all photos

const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

// Get user photos

const getUserPhotos = async (req, res) => {
  const { id } = req.params;

  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

// Get photo by ID
const getPhotoById = async (req, res) => {
  const { id } = req.params;

  const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

  //Check if photo exists
  if (!photo) {
    return res.status(404).json({ errors: ["Photo not found!"] });
  }

  res.status(200).json(photo);
};

// Update a photo
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  // Check if photo exists
  if (!photo) {
    return res.status(404).json({ errors: ["Photo not found!"] });
  }

  // Check if photo belongs to user
  if (!photo.userId.equals(reqUser._id)) {
    return res
      .status(422)
      .json({ errors: ["An error has occurred, please try again later"] });
  }

  if (title) {
    photo.title = title;
  }

  await photo.save();

  res.status(200).json({ photo, message: "Photo updated wit success!" });
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
};
