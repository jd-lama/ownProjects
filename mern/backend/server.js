const express = require('express')
const dotenv = require('dotenv').config()
const color = require('colors')
const port = process.env.PORT || 5000
const connectDB = require('./config/config')
const app = express()
connectDB()
app.use('/api/goals', require('./router/goalRouter'))
app.listen(port,()=>console.log(`server started in port: ${port}`))