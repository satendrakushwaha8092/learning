const user = require('./model')
const addEmailInQueue = require('../rabbitMQ/producer')

module.exports.addUser = async (req, res) => {
    console.log(req.body)
    const response = await user.create(req.body)
    addEmailInQueue.publishEmailTask(req.body)
    res.status(201).send({ message: "registered successfully", data: response })
}

module.exports.updateUser = async (req, res) => {
    const userId = req.params.id
    const response = await user.updateOne({ userId }, req.body)
    res.status(200).send({ message: "updated successfully", data: response })
}

module.exports.updateUserRole = async (req, res) => {
    const userId = req.params.id
    const roleId = req.body.roleId
    const response = await user.updateOne({ userId }, { $addToSet: { role: roleId } })
    res.status(200).send({ message: "updated successfully", data: response })
}

module.exports.removeUserRole = async (req, res) => {
    const userId = req.params.id
    const roleId = req.body.roleId
    const response = await user.updateOne({ userId }, { $pull: { role: roleId } })
    res.status(200).send({ message: "remved successfully", data: response })
}

module.exports.getUserById = async (req, res) => {
    const userId = req.params.id
    const response = await user.findOne({ userId }).populate({
        path: "roles",
        select: "-_id"   // hide _id, show only roleId and name
    });

    res.status(200).send({ message: "fetched records successfully", data: response })
}

module.exports.getAllUsers = async (req, res) => {
    // const response = await user.find().select({_id:0,__v:0,updatedAt:0,createdAt:0,password:0})
    const response = await user.aggregate([
        {
            $facet: {
                users: [
                    {
                        $lookup: {
                            from: "roles",
                            localField: "role",
                            foreignField: "roleId",
                            as: "rolesInfo"
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            __v: 0,
                            password: 0,
                            createdAt: 0,
                            updatedAt: 0,
                            "rolesInfo._id": 0,
                            "rolesInfo.__v": 0
                        }
                    },
                ],
                totalCount: [
                    { $count: "count" }
                ]
            }
        }
    ]);
    res.status(200).send({ message: "fetched records successfully", data: response })
}