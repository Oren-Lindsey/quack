import 'dotenv/config'
import mongoose from 'mongoose';
import { Session } from '../../../lib/session-schema'
const db_url = process.env["MONGODB_URL"]
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(event) {
    const sessions = await getSessions()
      return {
        body: {
          sessions: sessions
        }
      }
  }
async function getSessions() {
    await mongoose.connect(db_url);
    const doc = await Session.find()
    return doc
}