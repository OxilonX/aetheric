const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const authToken = require("../middleware/authToken");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const userId = req.user.id;
    cb(null, `user-${userId}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Only allow these
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
//get reqs
router.get("/check", authToken, usersController.checkUser);
//post reqs
router.post("/register", usersController.addUser);
router.post("/login", usersController.loginUser);
router.get("/refresh", usersController.refreshToken);
router.post("/logout", usersController.logoutUser);
router.post(
  "/pic",
  authToken,
  upload.single("avatar"),
  usersController.updateProfilePic,
);

module.exports = router;
