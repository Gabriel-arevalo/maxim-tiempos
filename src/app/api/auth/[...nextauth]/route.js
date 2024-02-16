
import NextAuth from 'next-auth/next'
import CredentialsProvider  from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

import { connectMongoDB } from '@/lib/mongodb'
import User from '@/models/user'

export const authOptions ={
  providers:[
    CredentialsProvider({
      name:'credentials',
      credentials: {},

      async authorize(credentials){
        const { email, password } = credentials

        try {
          await connectMongoDB()
          const user = await User.findOne({ email })

          if(!user) return null
          const passwordMatch = await bcrypt.compare(password, user.password)

          if(!passwordMatch) return null

          return user
        } catch (error) {
          console.log(error);
        }
      },
      
    })
  ],
  session:{
    strategy: "jwt",
    maxAge: 24 * 60 * 60
  },
  secret:process.env.NEXTAUTH_SECRET,
  pages:{
    signIn: '/'
  },
  jwt: {
    signingKey: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }