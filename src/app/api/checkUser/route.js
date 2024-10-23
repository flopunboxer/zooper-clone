
import dbConnect from '@/utils/mongo/dbConnect';
import User from '@/utils/mongo/models/userSchema'

export async function POST(req) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  
  await dbConnect();
  
  const { email } = await req.json();

  try {
    const user = await User.findOne({ email });
    if (user) {
      return new Response(JSON.stringify({ exists: true,code:200,data:user }), { status: 200 });
    }
    return new Response(JSON.stringify({ exists: false,code:200 }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server Error',code:500 }), { status: 500 });
  }
}