// pages/api/user/[username]/[action].js

import Prompt from '@models/Prompt';
import User from '@models/User';
import { connectToDb } from '@utils/db';

export async function GET(req, { params }) {
  const { userId, action } = params;

  try {
    await connectToDb();

    const prompts = await Prompt.find({ author: userId }).populate('author');
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: err.message }), { status: 500 });
  }
}
