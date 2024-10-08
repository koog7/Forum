import mongoose from "mongoose";

interface INews{
    title: string;
    description?: string;
    image?: string;
}

const Schema = mongoose.Schema;

const ForumTheme = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        validate: {
            validator: function (this:INews){
                return !!this.description || !!this.image;
            },
            message: 'Description is required if image is not provided.',
        }
    },
    image:{
        type: String,
        validate: {
            validator: function (this:INews){
                return !!this.image || !!this.description;
            },
            message: 'Description is required if image is not provided.',
        }
    },
    date:{
        type:String,
    }
})

const Forum = mongoose.model('Forum' , ForumTheme);

export default Forum;