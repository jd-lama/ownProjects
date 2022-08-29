const express = require('express')
const router = express.Router()
const Getgoals = require("../controller/goalController")

router.route('/').get(Getgoals)


module.exports = router