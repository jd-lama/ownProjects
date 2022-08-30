const express = require('express')
const router = express.Router()
const {getGoals,setGoals,putGoals,deleteGoals} = require('../controller/goalController')
 const {protect} = require('../middleware/authMiddleware')
// router.route('/').get(protect,getGoals).post(protect,setGoals)
// router.route('/:id').delete(protect,deleteGoals).put(protect,putGoals)
router.route('/').get(getGoals).post(setGoals)
router.route('/:id').delete(deleteGoals).put(putGoals)
module.exports = router