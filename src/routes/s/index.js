/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(event) {
  return {
    status: 302,
    headers: { Location: '/session' }
    }
}