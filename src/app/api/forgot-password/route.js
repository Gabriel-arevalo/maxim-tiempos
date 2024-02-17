import { NextResponse } from "next/server"
import crypto from 'crypto'

import nodemailer from 'nodemailer'

import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import Recovery from "@/models/recovery"

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});

export async function POST(request){

  try {
    const { email } = await request.json()

    await connectMongoDB()
  
    const user = await User.findOne({ email })
  
    if(!user){
      return NextResponse.json({ 
        message: 'Email no encontrado en BD'
      }, {status: 404})
    }

    const resetURLToken = crypto.randomBytes(20).toString('hex')
    const resetBDToken  = crypto
              .createHash('sha256')
              .update(resetURLToken)
              .digest('hex')

    const resetTokenExpires = Date.now() + 3600000 // 1 hora

    const resetUrl     = `${process.env.VERCEL_URL}/reset-password/${ resetURLToken }`
    const recoveryResp = await Recovery.findOne({ email }).select("email");

    if(!recoveryResp){
      await Recovery.create({
        email,
        resetToken: resetBDToken,
        resetTokenExpiry: resetTokenExpires
      })
    }else{
      const {email: recoveryEmail} = recoveryResp
      await Recovery.updateOne({email: recoveryEmail},
        { 
          resetToken: resetBDToken,
          resetTokenExpiry: resetTokenExpires
        }
      )
    }

    const  message = {
      from: "Web app maxim-tiempos",
      to: user.email,
      subject: "Solicitud recuperación de contraseña",
      text: "Plaintext version of the message",
      html: `<p>Hola ${user.fullName}:</p>
        <p>Acá tiene un url para la recuperación de su contraseña:</p>
        <p> ${resetUrl} </p>
        <p> Por favor copie y pegue en el buscador de su navegador </p><br>
        <p>Sistema automático de Google.</p>
      `
    };

    transporter.sendMail(message, (error, info) => {
      console.log('ejecutado');
      if (error) {
          console.log("Error enviando email")
          console.log(error.message)
      } else {
          console.log("Email enviado")
      }
  })

    return NextResponse.json({message: 'Email sent'})

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error.message
    }, {status: 500})
  }

}