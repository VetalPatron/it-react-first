const express = require('express')
const mongoose = require('mongoose')
// const authRoute = require('./route/authRoute')

const PORT = process.env.PORT || 5000
const index = express()
index.use(express.json({ extended: true }))

index.use('/api/auth', require('./routes/auth.route'))

async function start() {
    try {
        await mongoose.connect("mongodb://admin:4321@cluster1-shard-00-00.lqwh7.mongodb.net:27017,cluster1-shard-00-01.lqwh7.mongodb.net:27017,cluster1-shard-00-02.lqwh7.mongodb.net:27017/CreateDb2?ssl=true&replicaSet=atlas-awp6g0-shard-0&authSource=admin&retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true

        })
        index.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}...`)
        })
    } catch (err) {
        console.error(err)
        // process.exit(1)
    }
}
start()
