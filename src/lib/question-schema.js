import mongoose from 'mongoose';
const questionSchema = new mongoose.Schema({
    content: String,
    parentId: String,
    hidden: Boolean,
    ipAddress: String,
})
const Question = mongoose.model('question', questionSchema);
export { Question };