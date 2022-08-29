const asyncHandler = require("express-async-handler")
const Goal = require('../schema/goalSchema')
const Getgoals = asyncHandler(async(req,res)=>{
	const goals = await Goal.find()
	res.status(200).json(goals)
})
// const SetGoals = asyncHandler(async(req,res)=>{
// 	res.status(200).json({message:"yo"})
// })

module.exports = Getgoals