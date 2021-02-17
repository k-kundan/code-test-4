const User = require('../models/Users');
const tokenHandler = require('../middlewares/token-handlers')


module.exports = {
    createUser: async (req, res, next) => {
        try {

            const user = new User(req.body);
            await user.save();

            let token = await tokenHandler.generateToken(req.body)

            res.status(200).json({
                msg: "User Added Successfully",
                data: user,
                jwt_token: token
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                msg: "Failed to Add User",
                data: req.body
            })
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            await User.deleteOne({
                _id: req.params.id
            })
            res.status(200).json({
                msg: "User Deleted Successfully",
                data: req.params.id
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                msg: "Failed to Delete User"
            })
        }
    },

    getUser: async (req, res, next) => {
        try {
            const users = await User.findOne({
                _id: req.params.id
            });
            res.status(200).json({
                msg: "User Found Successfully",
                data: users
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                msg: "Failed to Find User"
            })
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const users = await User.find({});
            res.status(200).json({
                msg: "Users Found Successfully",
                data: users
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                msg: "Failed to Find Users"
            })
        }
    }
}