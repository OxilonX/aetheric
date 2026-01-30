const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const authToken = require("../middleware/authToken");
const isAdmin = require("../middleware/isAdmin");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
  },
  filename: (req, file, cb) => {
    const userId = req.user.id;
    cb(null, `user-${userId}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Error: Images Only!"));
    }
  },
  limits: { fileSize: 3 * 1024 * 1024 },
});
//post reqs
router.post(
  "/add",
  authToken,
  isAdmin,
  upload.single("prod_img"),
  productsController.addProduct,
);
module.exports = router;
