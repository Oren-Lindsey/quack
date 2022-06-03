import 'dotenv/config'
import mongoose from 'mongoose';
import objectid from 'validate-objectid'
import { Question } from '../../../lib/question-schema'
import { Session } from '../../../lib/session-schema'
const db_url = process.env["MONGODB_URL"]
const defaultHide = process.env["HIDDEN_BY_DEFAULT"] || true
async function addQuestion(data) {
    await mongoose.connect(db_url);
    const newQuestion = new Question({ content: data.content, parentId: data.parentId, hidden: defaultHide, ipAddress: data.ipAddress });
    await newQuestion.save()
    const session = await Session.findById(data.parentId)
    return {doc: newQuestion, session: session}
}
async function getName(id) {
  await mongoose.connect(db_url);
  const doc = await Session.findById(id)
  if (doc.name) {
    return doc
  } else {
    return undefined
  }
}
async function getExists(id) {
  await mongoose.connect(db_url);
  const doc = await Session.exists({ "_id": id})
  if (doc) {
    return true
  } else {
    return false
  }
}
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(event) {
    const data = await event.request.json()
    data.ipAddress = await event.clientAddress
    const saved = await addQuestion(data)
    return {
      body: {
        data: saved
      }
    };
  }
export async function get(event) {
    const id = event.params.id
    const valid = objectid(id)
    if (valid) {
      const exists = await getExists(id)
      if (exists) {
        const doc = await getName(id)
        return {
          body: {
            id: `${id}`,
            name: doc.name
          }
        };
      } else {
        return {
          headers: {
            'Location': '/'
          },
          status: 302
        }
    }
  } else {
    return {
      headers: {
        'Location': '/'
      },
      status: 302
    }
  }
}