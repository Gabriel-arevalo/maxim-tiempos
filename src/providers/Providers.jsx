"use client"

import { SessionProvider } from 'next-auth/react'
import { NextUIProvider } from '@nextui-org/system'

export default function AuthProvider({ children }) {
  return <SessionProvider>{ children }</SessionProvider>
}



export const NextUiProvider = ({ children }) => {
  return (
    <NextUIProvider>
      { children }
    </NextUIProvider>
  )
}