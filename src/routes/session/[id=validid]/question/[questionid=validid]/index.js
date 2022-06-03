import 'dotenv/config'
import mongoose from 'mongoose';
import { Question } from '../../../../../lib/question-schema'
import { Session } from '../../../../../lib/session-schema'
const db_url = process.env["MONGODB_URL"]
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function put(event) {
    const sessionid = event.params.id
    const questionid = event.params.questionid
    const sessionexists = await checkIfSessionExists(sessionid)
    if (sessionexists) {
      const questionexists = await checkIfQuestionExists(questionid)
      if (questionexists) {
        const data = await event.request.json()
        //console.log(data)
        const newData = {content: data.content, hidden: data.checked}
        const question = await updateQuestion(questionid, newData)
        return {
          body: {
            question: question
          }
        }
      } else {
        return {
          status: 302,
          headers: { Location: '/' }
        }
      }
    } else {
      return {
        status: 302,
        headers: { Location: '/' }
      }
    }
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
async function checkIfQuestionExists(id) {
  await mongoose.connect(db_url);
  const doc = await Question.exists({ _id: id })
  if (doc) {
    return true
  } else {
    return false
  }
}
async function updateQuestion(id, data) {
  await mongoose.connect(db_url);
  const doc = await Question.findByIdAndUpdate(id, data)
  return doc
}
