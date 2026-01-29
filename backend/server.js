const express = require("express");
const usersRoutes = require("./routes/usersRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", usersRoutes);
app.listen(5000, () => {
  console.log("Server is Listening on port 5000");
});
