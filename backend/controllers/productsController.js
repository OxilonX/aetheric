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
      return res.status(401).json({ msg: "category not found." });
    if (!image_url)
      return res.status(401).json({ msg: "product image not found." });
    const response = await pool.query(
      "INSERT INTO products (name,price,description,prod_img,category_id,sku) VALUES($1,$2,$3,$4,$5,$6) RETURNING *;",
      [name, price, description, image_url, selectedCatId, sku],
    );
    res.json(response.rows[0]);
  } catch (err) {
    res.status(401).json(err);
  }
};
exports.removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await pool.query(
      "SELECT prod_img FROM products WHERE id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
    const relativePath = result.rows[0].prod_img;
    const response = await pool.query("DELETE FROM products WHERE id=$1", [id]);
    // We use __dirname to get the current folder, then go up to the root
    const fullPath = path.join(__dirname, "..", relativePath);

    if (fs.existsSync(fullPath)) {
      fs.unlink(fullPath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
    if (response)
      return res
        .sendStatus(201)
        .json("product and prod image deleted successfully.");
  } catch (err) {
    res.sendStatus(401).json(err);
  }
};
exports.getProducts = async (req, res) => {
  try {
    const response = await pool.query(`
 SELECT 
  p.id, 
  p.name, 
  p.price, 
  p.description, 
  p.prod_img, 
  p.sku, 
  c.name AS category 
  FROM products p
  JOIN category c ON p.category_id = c.id
`);
    res.json(response.rows);
  } catch (err) {
    res.status(401).json("couldn't get the products list.");
  }
};
exports.addToCart = async (req, res) => {
  try {
    const id = req.user.id;
    const { prod_id, quantity = 1 } = req.body;
    const response = await pool.query(
      `INSERT INTO cart (user_id,product_id,quantity) VALUES($1,$2,$3) ON CONFLICT (user_id, product_id) 
      DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity 
      RETURNING *`,
      [id, prod_id, quantity],
    );
    if (!response) return res.status(401).json("Add product to cart failed.");
    res.json(response.rows[0]);
  } catch (err) {
    res.status(403).json(err);
  }
};
exports.getCart = async (req, res) => {
  try {
    const id = req.user.id;
    const response = await pool.query(
      `SELECT 
    c.quantity,
    p.name,
    p.price,
    p.description,
    p.sku,
    p.prod_img AS url,
    ct.name AS category
    FROM cart AS c 
    JOIN products AS p ON  c.product_id = p.id 
    JOIN category AS ct ON p.category_id = ct.id 
    WHERE c.user_id = $1`,
      [id],
    );
    if (!response) return res.status(403).json("Get Cart Products Failed.");
    res.status(200).json(response.rows);
  } catch (err) {
    res.status(401).json(err);
  }
};
