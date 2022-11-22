const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel")
const generateToken = require("../Config/GenerateToken")

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password, picture} = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const userExist = await User.findOne({email})
    if (userExist) {
        res.status(400)
        throw new Error("User Already Exists")
    }

    const user = await User.create({
        name,
        email,
        password,
        picture,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.picture,
            token: generateToken(user._id)
        });
    } else {
        res.status(400)
        throw new Error("Fsiled to create user")
    }
})

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.picture,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(401)
        throw new Error("Invelid email or password")
    }
})
module.exports = {registerUser,authUser};