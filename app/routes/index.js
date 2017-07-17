var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index_view');
});

module.exports = router;