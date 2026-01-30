const express = require("express");
const usersRoutes = require("./routes/usersRoutes");
const productsRoutes = require("./routes/productsRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
const uploadsPath = path.join(process.cwd(), "uploads");
app.use("/uploads", express.static(uploadsPath));
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.listen(5000, () => {
  console.log("Server is Listening on port 5000");
});
