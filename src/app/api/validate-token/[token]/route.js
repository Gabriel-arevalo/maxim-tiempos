import { NextResponse } from "next/server"

import crypto from 'crypto'
import Recovery from "@/models/recovery";
import { connectMongoDB } from "@/lib/mongodb";

export async function GET(request, { params }){
  const { token } = params

  const hashedToken = crypto
  .createHash("sha256")
  .update(token)
  .digest('hex')

  try {
      await connectMongoDB();

      const account = await Recovery.findOne({
        resetToken: hashedToken,
        resetTokenExpiry: {$gt: Date.now()}       // Busca token sin expirar
      })
    
      if(!account){
        return NextResponse.json(
          { message: 'Token inválido o expirado'},
          {status: 400}
        )
      }

      return NextResponse.json({ email: account.email })
  } catch (error) {
    console.log(error);
    return NextResponse.json( 
      {message: error.message},
      { status: 500 }
    )
  }

}