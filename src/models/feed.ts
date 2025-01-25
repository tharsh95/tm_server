import mongoose from "mongoose";
const feedSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    }, 
    description: {
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true
    }
})
  const Feed = mongoose.model("feed", feedSchema);
    export default Feed;