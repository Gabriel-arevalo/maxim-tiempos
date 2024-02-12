'use client'

import { signOut } from 'next-auth/react';
import { Button } from './Button';

const handleSignout = async() => {
  localStorage.clear()
  signOut()
}

export const ButtonWrapper = () => {
  return (
    <div>
      <Button 
        onClick={ handleSignout } 
        label="Logout"
        className="border border-white rounded-md px-5"
      />
    </div>
  )
}