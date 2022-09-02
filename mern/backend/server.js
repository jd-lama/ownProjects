const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const color = require('colors')
const ConnectDB = require('./config/db')
const app = express()
 const {errorHandler} = require('./middleware/errorMiddleware')

ConnectDB()
app.use(express.json())
app.use(express.urlencoded({extented: false}))
app.use(errorHandler)
app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.listen(port, () =>console.log(`server started ${port}`))