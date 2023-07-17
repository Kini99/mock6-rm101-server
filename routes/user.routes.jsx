const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
    const { username, email, password, interests } = req.body;
    try {
        const existing = await UserModel.findOne({ email });
        if (existing) {
            return res.status(200).json({ msg: "User already Exists! Please login!" });
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.json({ err: err.message });
            } else {
                const user = new UserModel({ username, email, password: hash, interests });
                await user.save();
                res.status(200).json({ msg: "User signup successful! Kindly Login!" })
            }
        })
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, async(err, result) => {
                if (result) {
                    let today = new Date().toISOString().slice(0, 10);
                    if ( user.loginHistory && user.loginHistory.length!==0 && user.loginHistory[user.loginHistory.length - 1] !== today) {
                        const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 10);
                        if (user.loginHistory[user.loginHistory.length - 1] !== yesterday){
                            user.loginHistory=[today];
                        }else{
                            user.loginHistory = [...user.loginHistory, today];
                        }
                    }else{
                        user.loginHistory=[today];
                    }
                    if (isNaN(user.points)) {
                        user.points = 0;
                      }
                    user.points += Number(user.loginHistory.length <= 7 ? user.loginHistory.length * 10 : 100);
                    await user.save();
                    res.status(200).json({ msg: "Logged in Successfully", user })
                } else {
                    res.status(400).json({ error: err.message, msg: "Invalid Credentials!" });
                }
            })
        } else {
            res.status(400).json({ msg: "User not found, Please Signup!" })
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

module.exports = {
    userRouter
}