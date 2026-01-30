const express = require("express");
const app = express();
const pool = require("../config/db");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
app.use(express.json());
const skuGen = require("../utils/skuGenerator");
exports.addProduct = async (req, res) => {
  try {
    const { category, name, price, description } = req.body;
    const sku = skuGen(name, category);
    console.log(req.body);
    if (!req.file) {
      return res.status(400).json({ msg: "Product image file is required." });
    }
    const image_url = req.file
      ? `/uploads/products/${req.file.filename}`
      : null;
    const catResult = await pool.query(
      "SELECT id FROM category WHERE name=$1",
      [category],
    );
    if (catResult.rows.length === 0) {
      return res.status(404).json({ msg: "Category not found." });
    }
    const selectedCatId = catResult.rows[0].id;
    if (!selectedCatId)
      return res.sendStatus(401).json({ msg: "category not found." });
    if (!image_url)
      return res.sendStatus(401).json({ msg: "product image not found." });
    const response = await pool.query(
      "INSERT INTO products (name,price,description,prod_img,category_id,sku) VALUES($1,$2,$3,$4,$5,$6) RETURNING *;",
      [name, price, description, image_url, selectedCatId, sku],
    );
    console.log(res.json(response.rows[0]));
  } catch (err) {
    console.log(err);
  }
};
