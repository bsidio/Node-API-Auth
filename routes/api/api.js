const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //your api
  res.json({ message: 'hooray! welcome to our api!' });   

});


module.exports = router;