const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes
router.use("/api", apiRoutes);

router.use(function(req, res) {
  router.use(express.static(__dirname, "../client/build"));
  res.sendFile(path.join(__dirname, "../../build/index.html"));
});

module.exports = router;
