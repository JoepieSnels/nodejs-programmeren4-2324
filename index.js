const express = require('express')
const userRoutes = require('./src/routes/user.routes')
const mealRoutes = require('./src/routes/meal.routes')
const authRoutes = require('./src/routes/authentication.routes').routes
const logger = require('./src/util/logger')

const app = express()

app.use(express.json())

const port = process.env.PORT || 3000

app.get('/api/info', (req, res) => {
    console.log('GET /api/info')
    const info = {
        name: 'My Nodejs Express server',
        version: '0.0.1',
        description: 'This is a simple Nodejs Express server'
    }
    res.json(info)
})

app.use('/api/auth', authRoutes)
app.use(userRoutes)
app.use(mealRoutes)

app.use((req, res, next) => {
    logger.error('Route not found')
    next({
        status: 404,
        message: 'Route not found',
        data: {}
    })
})

// Express error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
        data: {}
    })
})

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`)
})

// This export is necessary so that Chai can start the server
module.exports = app
