import 'dotenv/config'
import mongoose from 'mongoose';
import { Session } from '../../lib/session-schema'
const db_url = process.env["MONGODB_URL"]
async function addSession(data) {
    await mongoose.connect(db_url);
    const newSession = new Session({ name: data.name });
    await newSession.save()
    return newSession
}
async function checkExists(name) {
  await mongoose.connect(db_url);
  const doc = await Session.exists({ name: name })
  if (doc) {
      return true
  } else {
      return false
  }
}
function validateName(name) {
  const regex = /^[a-z0-9_\\-]{1,100}$/
  if (regex.test(name)) {
    return true
  } else {
    return false
  }
}
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(event) {
    const data = await event.request.json()
    const exists = await checkExists(data.name.toLowerCase())
    data.name = data.name.toLowerCase()
    if (!exists) {
      if (validateName(data.name)) {
        const saved = await addSession(data)
        return {
          body: {
            data: saved
          }
        };
      } else {
        return {
          status: 400,
          body: {
            error: 'Invalid name - use only letters, numbers, underscores, and dashes (1-100 characters)'
          }
        }
      }
    } else {
      return {
        status: 409,
        body: {
          error: 'A session with that name already exists. Choose a different name.'
        }
      }
    }
  }