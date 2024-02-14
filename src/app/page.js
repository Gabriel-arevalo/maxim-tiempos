import { getServerSession } from 'next-auth'

import { authOptions } from './api/auth/[...nextauth]/route'
import { LoginForm } from '@/components/LoginForm'
import { redirect } from 'next/navigation'

export default async function Home() {

  const session = await getServerSession( authOptions)

  if(session?.user) redirect('/dashboard')

  return (
    <LoginForm />
  )
}
