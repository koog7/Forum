import express from "express";
import User from "../models/ForumUser";
import Message from "../models/ForumMessages";
import Forum from "../models/ForumTheme";

const ForumMessageRouter = express.Router();
ForumMessageRouter.use(express.json());


ForumMessageRouter.get('/:id' , async (req ,res ,next) =>{
    try {
        const id = req.params.id;

        const messages = await Message.find({postId: id }).populate('userId', 'username');

        if(messages.length === 0){
            return res.status(401).send({ error: 'Not found' });
        }
        res.send(messages);
    }catch (e) {
        next(e)
    }
})

ForumMessageRouter.post('/:id',async (req, res , next) =>{
    const getToken = req.get('Authorization')

    if(!getToken){
        return res.status(401).send({ error: 'Unauthorized' });
    }

    try{
        const [_Bearer, token] = getToken.split(' ');

        const id = req.params.id;

        const findPost = await Forum.findById(id);

        if (!findPost) {
            return res.status(404).send({ error: 'Post not found' });
        }

        const UserData = await User.findOne({token: token})

        if (!UserData || !UserData._id) {
            return res.status(400).send({ error: 'User not found' });
        }

        const newPostMessage = new Message({
            userId: UserData._id,
            postId: id,
            message: req.body.message,
        })

        await newPostMessage.save()
        res.send(newPostMessage);
    }catch (e) {
        next(e)
    }
})

export default ForumMessageRouter;