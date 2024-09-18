import express from "express";
import {randomUUID} from "crypto";
import User from "../models/ForumUser";
import mongoose from "mongoose";


const ForumUserRouter = express.Router();
ForumUserRouter.use(express.json());

ForumUserRouter.post('/' , async (req,res,next) =>{
    try {
        const existingUser = await User.findOne({ username: req.body.username });

        if (existingUser) {
            return res.status(400).send({ message: 'Username already taken' });
        }

        const user = new User({
            username: req.body.username,
            password: req.body.password,
            token: randomUUID(),
        })

        await user.save()
        res.send(user)

    }catch (e) {
        if(e instanceof mongoose.Error.ValidationError){
            return res.status(400).send(e)
        }
        return next(e)
    }
})

ForumUserRouter.post('/sessions' , async (req , res , next) => {
    try{
        const user = await User.findOne({username: req.body.username})

        if(!user){
            return res.status(400).send({error:'User or password are wrong'})
        }

        const comparePswrd = await bcrypt.compare(req.body.password , user.password)

        if(!comparePswrd){
            return res.status(400).send({error:'User or password are wrong'})
        }

        user.token = randomUUID();

        await user.save()
        res.send(user)
    }catch (e) {
        if(e instanceof mongoose.Error.ValidationError){
            return res.status(400).send(e)
        }
        return next(e)
    }
})

export default ForumUserRouter;