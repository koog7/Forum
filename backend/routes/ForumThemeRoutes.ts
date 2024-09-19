import express from "express";
import Forum from "../models/ForumTheme";
import User from "../models/ForumUser";
import {imagesUpload} from "../multer";

const ForumThemeRouter = express.Router();
ForumThemeRouter.use(express.json());

ForumThemeRouter.get('/' , async (req ,res ,next) =>{
    try{
        const allPosts = await Forum.find().sort({date:-1});

        if(!allPosts){
            return res.status(400).send({error: 'Some problems with fetching all post'})
        }

        res.send(allPosts)
    }catch (e) {
        next(e)
    }
})

ForumThemeRouter.post('/', imagesUpload.single('photo'), async (req,res,next) => {
    const getToken = req.get('Authorization');

    if(!getToken){
        return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
        const [_Bearer, token] = getToken.split(' ');

        const UserData = await User.findOne({token: token})

        if (!UserData || !UserData._id) {
            return res.status(400).send({ error: 'User not found' });
        }

        const newTheme = new Forum({
            userId: UserData._id,
            title: req.body.title,
            description: req.body.description? req.body.description : null,
            image: req.file? req.file.filename : null,
            date: (new Date).toISOString()
        })

        await newTheme.save();
        res.send(newTheme)

    }catch (e) {
        next(e)
    }
})


export default ForumThemeRouter;