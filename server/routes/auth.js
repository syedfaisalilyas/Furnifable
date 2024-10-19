const express = require('express');
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();


authRouter.post('/api/signup', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const existingPass = await User.findOne({ email });
        if (existingPass) {
            return res.status(400).json({ msg: 'user with the same email already exists' });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            var user = new User({ fullName, email, password: hashPassword });
            user = await user.save();
            res.json({ user });
        }

    } catch (e) {
        res.status(500).json({ error: e.message });
    }

})

authRouter.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(400).json({ msg: 'user with this email does not exist' });
        }
        else {
            const isMatch = await bcrypt.compare(password, findUser.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Incorrect Password' });
            }
            else {
                const token = jwt.sign({ id: findUser._id }, 'passwordKey');

                const { password, ...userWithOutPassword } = findUser._doc;
                res.json({ token, ...userWithOutPassword });
            }
        }
    } catch (error) {
        res.status(500).json({ error: e.message });

    }
})
module.exports = authRouter;