const express = require('express')
const app = express()

const userRoute = require('./user/route')
const roleRoute = require('./role/route')

app.use('/health',(req,res)=>{
    res.status(200).send({msg:"working fine"})
})

app.use('/user',userRoute)
app.use('/role',roleRoute)

module.exports = app