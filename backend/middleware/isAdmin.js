const isAdmin = (req, res, next) => {
  console.log("Full User Object:", req.user);
  console.log("User Role:", req.user?.role);
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ msg: "Access denied. Admins only." });
  }
};
module.exports = isAdmin;
