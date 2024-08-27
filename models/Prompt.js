import mongoose, { Schema, model, models } from "mongoose";

const promptSchema = new Schema ({
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt:{
        type: String,
        required:[true, 'Prompt Is Required']
    },
    tag:{
        type: String,
        required:[true, 'Tag Is Required']
    }
})


const Prompt = models.Prompt || model('Prompt', promptSchema)

export default Prompt