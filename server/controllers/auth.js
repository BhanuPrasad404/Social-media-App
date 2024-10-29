import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

//Register user

export const register = async (req, res) => {

    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            location,
            occupation

        } = req.body;
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
        const salt = await bcrypt.genSalt(); //encrypting the password
        const passwordHash = await bcrypt.hash(password, salt)  // hashing the encrypted password  for better security

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            location,
            occupation,
            viewdProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)

        });
        const savedUSer = await newUser.save();
        res.status(201).json(savedUSer)
    }
    catch (error) {
        res.status(500).json(`Error occurred: ${error}`);
    }
}

//Logging in

export const login = async(req, res)=> {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email:email});
        if(!user) return res.status(400).json({msg:"user  does not exist."});

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(400).json({msg:"Invalid "})

        //token generation

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token,user});

    }
    catch (err) {
        res.status(500).json({error:err.message})
    }
}