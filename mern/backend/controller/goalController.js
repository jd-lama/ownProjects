const asyncHandler = require('express-async-handler')
const Goal = require('../modal/goalModal')
const User = require('../modal/userModal')
const getGoals = asyncHandler(async(req,res) =>{
	const goals = await Goal.find({user: req.user.id})
	
	res.status(200).json(goals)
})
const setGoals = asyncHandler(async(req,res) =>{
	if (!req.body.text){
		res.status(400)
		throw new Error('please add a text')
	}
	const goal = await Goal.create({
		text: req.body.text,
		user:req.user.id
	})
	res.status(200).json(goal)
})
const putGoals = asyncHandler(async(req,res) =>{
	if(!goal){
		res.status(400)
		throw new Error('Goal not found')
	}
	const user = await User.findById(req.user.id)
	if(!user){
		res.status(401)
		throw new Error('user not found')
	}

	if (goal.user.toString() !== user.id){
		res.status(401)
		throw new Error('user not authorized')
	}
	const updatedGoal = await Goal.findByIdAndUpdate(req.pramas.id,req.body,{
		new: true
	})
	res.status(200).json(updatedGoal)
})
const deleteGoals = asyncHandler(async(req,res) =>{
	const goal = Goal.findByIdAndRemove(req.id)
	if(!goal){
		res.status(400)
		throw new Error('goal not found')
	}
	await goal.remove()

	res.status(200).json({message:`Deleted goal ${req.params.id}`})
})


module.exports = {
	getGoals,setGoals,putGoals,deleteGoals
}