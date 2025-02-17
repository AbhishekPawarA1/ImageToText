import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config()


export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ Error: "Email already registered." })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({ username, email, password: hashedPassword });
        res.status(201).json({ msg: "User registered successfully." })

    } catch (error) {
        res.status(500).json({error: "Server Error while registering."})
    }
}

export const login = async( req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});

        if(!user){
            return res.status(404).json({error: "User not found"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(401).json({error : "Invalid Password"})
        }

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET,)
       return res.status(200).json({msg : "Login successful", token : token})
        
    } catch (error) {
        res.status(500).json({error: "Server Error while logging in."})

    }
}