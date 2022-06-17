const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const User = require("../models/user.model");
const { validationResult } = require("express-validator");

const signUp = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    // validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
        });

        const token = JWT.sign({ email: result.email, id: result._id }, process.env.SECRET, { expiresIn: "10h" });
        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;

    // validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = JWT.sign({ email: oldUser.email, id: oldUser._id }, process.env.SECRET, {
            expiresIn: "10h",
        });

        res.status(200).json({ result: oldUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};

const googleSignIn = async (req, res) => {
    const { email, name, token, googleId } = req.body;

    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            const result = { _id: oldUser._id.toString(), email, name };
            return res.status(200).json({ result, token });
        }

        const result = await User.create({
            email,
            name,
            googleId,
        });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};

module.exports = {
    signUp,
    signIn,
    googleSignIn,
};
