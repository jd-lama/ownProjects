const mongoose = require('mongoose')

const userSchemas = mongoose.Schema({
	name:{
		type:String,
		required:[true,'please add a name']
	},
	email:{
		type:String,
		required:[true,'please add a email'],
		unique: true
	},
	password:{
		type:String,
		required:[true,'please add a password'],
		
	},
},
{
	timestamps: true
})
mongoose.models = {}
module.exports = mongoose.model('User', userSchemas)