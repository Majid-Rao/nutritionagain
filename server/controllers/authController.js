const User = require('../models/userModel.js');
const createError = require('../utils/appError.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//register
exports.signup = async (req,res,next) =>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(user){
            return next(new createError('user already exist!',400));
        }
        const hashedPassword= await bcrypt.hash(req.body.password,12);
        const newUser= await User.create({
            ...req.body,
            password: hashedPassword,
        });
        //JWT
        const token = jwt.sign({_id: newUser._id}, process.env.JWT_SECRET, {
            expiresIn: '90d'
        });
        res.status(201).json({
            status: 'success',
            message:'user register successfull',
            token,
            user:{
                _id:newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        next(error);
    }
};
//login
exports.login = async (req,res,next) =>{
    // res.send('Login');
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {return next(new createError('User not found',404))};
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return next(new createError('Invalid password',401));
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '90d'
        });
        res.status(200).json({
            status: 'success',
            token,
            message:'user login successfull',
            user:{
                _id:user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })
    } catch (error) {
        next(error);
    }
};
