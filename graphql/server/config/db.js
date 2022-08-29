const mongoose = require('mongoose')
const url = process.env.MONGO_URL

const connectDB = async() =>{
    const conn = await mongoose.connect(url)
    console.log(`Server started on ${conn}`.cyan.underline.bold)
}

module.exports = connectDB