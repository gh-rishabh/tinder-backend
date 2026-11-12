const express = require("express");
const authRouter = express.Router();
const {validateSignUpData}=require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");



authRouter.post("/signup",async (req,res)=>{
    try{
        validateSignUpData(req);
        const {firstName,lastName,emailId,password} = req.body;

        const passwordHash = await bcrypt.hash(password,10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });

        const savedUser = await user.save()
        const token = await savedUser.getJWT();

        res.cookie("token",token,{
            expires : new Date(Date.now()+8*3600000)
        })

        res.json({ message: "Signup successful", data: savedUser });
    } catch(error){
        res.status(400).send("ERROR: "+error.message);
    }
});

module.exports = authRouter;


