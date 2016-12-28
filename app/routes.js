var express = require('express')
var router = express.Router()

// include sub-application routing
router.use('/', require(__dirname + '/subapp_routes.js'))

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

module.exports = router