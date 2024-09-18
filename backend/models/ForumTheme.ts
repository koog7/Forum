import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ForumTheme = new Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        validate: {
            validator: function (this){
                return this.image || this.description;
            }
        }
    },
    image:{
        type: String,
        validate: {
            validator: function (this){
                return this.description || this.image;
            }
        }
    },
})

const Forum = mongoose.model('Forum' , ForumTheme);

export default Forum;