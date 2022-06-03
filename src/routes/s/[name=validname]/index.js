import mongoose from 'mongoose';
import { Session } from '../../../lib/session-schema'
import "dotenv/config"
const db_url = process.env["MONGODB_URL"]
async function checkSession(name) {
    await mongoose.connect(db_url);
    const exists = await Session.exists({ name: name.toLowerCase() })
    if (exists) {
        return {value: true, doc: exists}
    } else {
        return {value: false}
    }
}
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(event) {
    const name = event.params.name
    const exists = await checkSession(name)
    if (exists.value) {
      return {
        headers: { Location: `/session/${exists.doc._id}` },
        status: 302
      }
    } else {
      return {
        status: 302,
        headers: { Location: '/' }
      }
    }
  }