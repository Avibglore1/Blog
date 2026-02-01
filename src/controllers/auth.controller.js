import User from "./../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async(req,res) =>{
    try {
        const {name,email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,email,password:hashedPassword
        });
        res.status(201).json({message: "User registered"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const login = async(req,res) =>{
    try {
        const {password,email} = req.body;
        const user = await User.findOne({email});
        if(!user) res.status(400).json({message: "User not found"});
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched) res.status(400).json({message: "Username or password do not match"});

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );
        res.json({token})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"})
    }
}