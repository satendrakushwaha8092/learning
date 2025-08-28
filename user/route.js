const express = require('express')
const route = express.Router()

const user = require('./controller')

route.get('/check',(req,res)=>{
    res.send("working")
})

route.post('/',user.addUser)
route.put('/:id',user.updateUser)
route.put('/update-role/:id',user.updateUserRole)
route.delete('/remove-role/:id',user.removeUserRole)
route.get('/:id',user.getUserById)
route.get('/',user.getAllUsers)

module.exports = route