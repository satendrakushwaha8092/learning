const express = require('express')
const route = express.Router()

const role = require('./controller')

route.post('/',role.addRole)

module.exports = route