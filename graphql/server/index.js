const { graphqlHTTP} = require("express-graphql")
const schema = require('./schema/schema')
const port = process.env.PORT || 5000
const cors = require('cors')
const express = require('express')
require('dotenv').config()
const color = require('colors')
const connectDB = require('./config/db')
const app = express();
connectDB()
app.use(cors())
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: process.env.NODE_ENV === 'development'
	})
	)

app.listen(port , console.log(`server started at port`))