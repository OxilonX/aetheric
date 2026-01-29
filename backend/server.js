const express = require("express");
const usersRoutes = require("./routes/usersRoutes");
const app = express();
app.use(express.json());
app.use("/api", usersRoutes);
app.listen(5000, () => {
  console.log("Server is Listening on port 5000");
});
