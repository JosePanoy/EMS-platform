import express from 'express'
import mongoose, {Mongoose} from 'mongoose'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 700
const MONGOURL = process.env.MONGOURL

mongoose.connect(MONGOURL).then (() => {
    console.log("Connection Success")
    app.listen(PORT, () => {
        console.log(`Server is working in ${PORT}`)
    })
}) . catch ((error) => console.log(error))