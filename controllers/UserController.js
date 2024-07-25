const userModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const jwtSecretKey = process.env.jwtSecretKey;

const getUsers = async (req, res) => {
    try {
        res.send({
            msg:"No user Found"
        })
    }
    catch (err) {
        console.log(err);
        res.send({
            status: "fail",
            data: {
                error: err
            }
        })
    }
}

const addUsers = async (req, res) => {

    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const secretPassword = await bcrypt.hash(password, salt);

    const data = {
        user: {
            email: email
        }
    }
    const authToken = jwt.sign(data, jwtSecretKey);

    try {
        await userModel.create({
            name: name,
            email: email,
            password: secretPassword,
            authToken: authToken
        })
        res.json({
            status: "success"
        })
    }
    catch (err) {
        console.log(err)
        res.json({
            status: err,
            msg: err.errmsg
        })
    }
}

const verifyUsers = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email:email });
    try {
        if (!user) {
            res.json({
                status: "false",
                msg: "No Account Found"
            })
        }
        else {
            const chkPass = await bcrypt.compare(password, user.password);
            if (chkPass) {
                res.json({
                    status: "true",
                    users: user,
                    authToken: user.authToken
                })
            }
            else {  
                res.json({
                    status: "false",
                    msg: "Invalid Credentials"
                })
            }
        }
    } 
    catch (err) {
        res.json({
            error: err
        })
    }
}

const replaceProduct = async (req, res) => {
    try {
        const reqId = req.params.id;
        const data = { ...req.body };
        const ans = await productModel.findOneAndReplace({ _id: reqId }, data);

        res.json({
            status: "success",
            results: 1,
            message: "Changed"
        })
    }
    catch (err) {
        res.json({
            status: "failes",
            message: err
        })
    }
}

const updateUsers = async (req, res) => {
    try {
        const data = req.body
        console.log(data.Name)
        // const ans = await productModel.findOneAndUpdate({ _id: req.params.id }, data);
        res.json({
            status: "success",
            results: 1,
            message: ans
        })
    }
    catch (err) {
        res.json({
            status: "failed",
            results: 1,
            message: err
        })
    }
}

const deleteProducts = async (req, res) => {

    try {
        const ans = await productModel.deleteMany(
            { "title": req.params.title } || { "price": req.params.id, "title": req.params.title });
        res.json({
            status: "success",
            results: 1,
            message: ans
        })
    }
    catch (err) {
        res.json({
            status: "failed",
            results: 1,
            message: err
        })
    }
}



module.exports = {
    getUsers,
    verifyUsers,
    addUsers,
    replaceProduct,
    updateUsers,
    deleteProducts
}