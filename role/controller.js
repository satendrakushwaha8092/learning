const role = require('./model')

module.exports.addRole = async (req,res) =>{
    console.log(req.body)
    const response = await role.create(req.body)
    res.status(201).send({message:"role added successfully",data:response})
}