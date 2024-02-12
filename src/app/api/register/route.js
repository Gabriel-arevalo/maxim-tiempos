import { NextResponse } from "next/server"

import { connectMongoDB } from "@/lib/mongodb"
import bcrypt from 'bcryptjs'

import User from '@/models/user'


export async function POST(request) {

  try {
    const { fullName, position, email, password } = await request.json()

    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB()
    
    const user = await User.findOne({ email }).select("_id");

    if( user ){
      return NextResponse.json({ message:'User already exist' }, {status: 409})
    }
    const userCreated = await User.create( {fullName, position, email, password: hashedPassword} )


    return NextResponse.json({
       message: 'User registered' ,
       userID: userCreated._id
    }, {status: 201})

  } catch (error) {
    return NextResponse.json({
      message: error.message
    },{ status: 500 })
  }

}