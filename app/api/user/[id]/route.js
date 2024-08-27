import User from '@models/User';
import { connectToDb } from '@utils/db';

export async function GET(req, { params }) {
  const { id, action } = params;

  try {
    await connectToDb();

    const prompts = await User.findById(id)
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: err.message }), { status: 500 });
  }
}
