const express = require("express");
const usersRoutes = require("./routes/usersRoutes");
const productsRoutes = require("./routes/productsRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
const PORT = process.env.PORT || 5000;
const uploadsPath = path.join(process.cwd(), "uploads");
app.use("/uploads", express.static(uploadsPath));
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.listen(PORT, () => {
  console.log("Server is Listening on port " + PORT);
});
