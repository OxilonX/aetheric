const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const fs = require("fs");
const path = require("path");
const generateAccessToken = require("../utils/tokenHelpers");
const { profile } = require("console");
require("dotenv").config();
app.use(express.json());
exports.addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body.data;
    const response = await pool.query(
      "INSERT INTO users (username,email,password) VALUES ($1,$2,$3)",
      [username, email, password],
    );
    res.json(response);
  } catch (err) {
    res.json("Error :" + err);
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body.data;
    const userResult = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (userResult.rows.length === 0)
      return res.json({
        msg: "user not found!",
      });
    const user = userResult.rows[0];
    const userPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(
      userPayload,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "15d" },
    );
    await pool.query(
      "INSERT INTO refresh_tokens (user_id,token,expires_at) VALUES($1,$2,NOW() + INTERVAL '15 days')",
      [userPayload.id, refreshToken],
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken: accessToken,
      user: {
        username: user.username,
        email: user.email,
        profile_pic: user.profile_pic,
      },
    });
  } catch (err) {
    console.log("Error:" + err);
  }
};
exports.refreshToken = async (req, res) => {
  const refreshtoken = req.cookies.refreshToken;
  if (!refreshtoken) return res.sendStatus(401);

  try {
    const tokenResult = await pool.query(
      "SELECT * FROM refresh_tokens WHERE token=$1",
      [refreshtoken],
    );
    if (tokenResult.rows.length === 0) return res.sendStatus(403);

    jwt.verify(
      refreshtoken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);

        const userPayload = { id: decoded.id, username: decoded.username };
        const token = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "15m",
        });

        res.json({ accessToken: token });
      },
    );
  } catch (err) {
    res.sendStatus(500);
  }
};
exports.getUsers = async (req, res) => {
  const user = req.user;
  const response = await pool.query("SELECT * FROM users WHERE username=$1", [
    user.username,
  ]);
  res.json(response.rows);
};

exports.logoutUser = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.sendStatus(404).json({ msg: "refresh token not found." });
  const response = await pool.query(
    "DELETE FROM refresh_tokens WHERE token=$1",
    [refreshToken],
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  });
  res.json({ msg: "token delted successfuly." });
};
exports.uploadPic = async (req, res) => {
  try {
    res.json("pic uploaded successfully.");
  } catch (err) {
    return res.json({ msg: err });
  }
};
exports.updateProfilePic = async (req, res) => {
  const userId = req.user.id;

  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const newImagePath = `/uploads/${req.file.filename}`;

  try {
    const userResult = await pool.query(
      "SELECT profile_pic FROM users WHERE id = $1",
      [userId],
    );

    const oldImagePath = userResult.rows[0]?.profile_pic;

    const defaultPic = "/uploads/default_profile_pic.png";

    if (oldImagePath && oldImagePath !== defaultPic) {
      const relativePath = oldImagePath.replace(/^\//, "");

      const absolutePath = path.join(process.cwd(), relativePath);

      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }
    }

    await pool.query("UPDATE users SET profile_pic = $1 WHERE id = $2", [
      newImagePath,
      userId,
    ]);

    res.json({ msg: "Profile updated.", url: newImagePath });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
exports.checkUser = async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, username, profile_pic,email FROM users WHERE id = $1",
      [req.user.id],
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
exports.updateUser = async (req, res) => {
  try {
    const id = req.user.id;
    const { username, email } = req.body;
    console.log(id, username, email);
    const response = await pool.query(
      "UPDATE users SET username=$1,email=$2 WHERE id=$3",
      [username, email, id],
    );

    res.json({ id: id, username: username, email: email });
  } catch (err) {
    res.status(403).send("User infos update failed.");
  }
};
