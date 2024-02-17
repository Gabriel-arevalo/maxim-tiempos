
import { NextResponse } from 'next/server';

import bcrypt from 'bcryptjs'

import { connectMongoDB } from "@/lib/mongodb"
import Recovery from '@/models/recovery';
import User from '@/models/user';

export async function POST(request){

  const { password, userEmail} = await request.json()

  try {
    await connectMongoDB();

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.updateOne(
      { email:userEmail },
      { password: hashedPassword}
    )

    await Recovery.deleteOne({email:userEmail})

    return NextResponse.json({message: 'Contraseña actualizada'})

  } catch (error) {
    console.log(error);
    return NextResponse.json({message: error.message},{status: 500})
  }

}