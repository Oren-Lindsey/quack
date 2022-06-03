import mongoose from 'mongoose';
const sessionSchema = new mongoose.Schema({
    name: String
})
const Session = mongoose.model('sessions', sessionSchema);
export { Session };