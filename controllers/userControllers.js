const userModel = require('../models/usersModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (_id) => { 
    const jwtKey = process.env.JWT_SEC_KEY;
    return jwt.sign({ _id }, jwtKey, { expiresIn: "10d" });
};

const signUp = async (req, res) => {
    try {
        const { username, email, password, age, gender } = req.body;

        let user = await userModel.findOne({ $or: [{ username }, { email }] });

        if (user) {
            return res.status(400).json('A user with this username or email address already exist');
        }

        if (!username || !email || !password) return res.status(400).json('All fields are required');

        if (!validator.isEmail(email)) {
            return res.status(422).json('Not a valid email address');
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(422).json('Password must contain a special case characters and symbols');
        };

        user = new userModel(req.body);

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(user.password, salt);

        const saveUser = await user.save();

        const token = createToken(user._id);

        res.status(201).json({_id: user._id, username, email, age, gender, token});
    } catch (e) {
        console.error(new Error(e));
        res.status(201).json(e);
    };
};

module.exports = { signUp }