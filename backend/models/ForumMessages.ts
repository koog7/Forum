import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ForumMessages = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum',
    },
    message:{
        type: String,
        required: true,
    }
})

const Message = mongoose.model('Message', ForumMessages);

export default Message;
