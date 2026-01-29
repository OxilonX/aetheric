const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
app.use(express.json());

exports.addUser = async (req, res) => {
  try {
    const { data } = req.body;
    const response = await pool.query(
      "INSERT INTO users (username,email,password) VALUES ($1,$2,$3)",
      [data.username, data.email, data.password],
    );
    res.json(response);
    console.log(response);
  } catch (err) {
    res.json("Error :" + err);
  }
};
