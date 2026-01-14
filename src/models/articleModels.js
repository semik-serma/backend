import mongoose from 'mongoose';


const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true, }
});

export const Article = mongoose.model('Article', articleSchema);


