const mongoose = require('mongoose')

const connectDB = async()=>{
	try{
		const conn = await mongoose.connect(process.env.MONGO_URL)
		console.log(`mongo conected: ${conn.connection.host}`.cyan.underline)
	}catch(error){
		console.log(error)
		process.exit(1)
	}
}

module.exports = connectDB