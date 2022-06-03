import 'dotenv/config'
import mongoose from 'mongoose';
import { Question } from '../../../../lib/question-schema'
import { Session } from '../../../../lib/session-schema'
const db_url = process.env["MONGODB_URL"]
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(event) {
    const id = event.params.id
    const exists = await checkIfSessionExists(id)
    if (exists) {
      const questions = await getAllQuestions(id)
      const session = await getSessionById(id)
      return {
        body: {
          questions: questions,
          session: session
        }
      }
    } else {
      return {
        status: 302,
        headers: { Location: '/' }
      }
    }
  }
async function getAllQuestions(id) {
    await mongoose.connect(db_url);
    const doc = await Question.find({ parentId: id, hidden: false })
    return doc
}
async function checkIfSessionExists(id) {
  await mongoose.connect(db_url);
  const doc = await Session.exists({ _id: id })
  if (doc) {
    return true
  } else {
    return false
  }
}
async function getSessionById(id) {
    await mongoose.connect(db_url);
    const doc = await Session.findById(id)
    return doc
}