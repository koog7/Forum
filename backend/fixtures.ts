import mongoose from "mongoose";
import User from "./models/ForumUser";
import Message from "./models/ForumMessages";
import Forum from "./models/ForumTheme";
import {randomUUID} from "crypto";

const run = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/Forum');
    const db = mongoose.connection;
    try {
        await db.dropCollection('forums')
        await db.dropCollection('messages')
        await db.dropCollection('users')
    }catch (e) {
        console.log(e)
    }

    const users = await User.create([
        {
            username: 'User1',
            password: 'password1',
            token: randomUUID(),
        },
        {
            username: 'User2',
            password: 'password2',
            token: randomUUID(),
        },
    ]);

    const [user1, user2] = users;

    const posts = await Forum.create([
        {
            title: 'First Post',
            description: 'This is the first post description.',
            date: (new Date).toISOString(),
            image: null,
            userId: user1._id,
        },
        {
            title: 'Second Post',
            description: 'This is the second post description.',
            date: (new Date).toISOString(),
            image: 'rg.webp',
            userId: user2._id,
        },
    ]);

    const [firstPost, secondPost] = posts;

    const comments = await Message.create([

        {
            postId: firstPost._id,
            userId: user2._id,
            message: 'Great post!',
        },
        {
            postId: firstPost._id,
            userId: user1._id,
            message: 'Thanks for sharing!',
        },

        {
            postId: secondPost._id,
            userId: user1._id,
            message: 'Interesting thoughts!',
        },
        {
            postId: secondPost._id,
            userId: user2._id,
            message: 'I totally agree!',
        },
    ]);


    await db.close();
}
run().catch(console.error)