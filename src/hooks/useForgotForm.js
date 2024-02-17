import { useState } from "react"

import { toast } from "react-hot-toast"

import { isValidEmail } from "@/helpers/isValidEmail"

export const useForgotForm = () => {
  
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async(e) => {
    e.preventDefault()

    if(!isValidEmail(email)){
      return toast.error('Ingresa un email válido')
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/forgot-password',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify( {email: email.trim()} )
      })

      if(!res.ok){
        const { message } = await res.json()
        setIsLoading(false)
        return toast.error(message)
      }

      setEmail('')
      toast.success('Email de recuperación enviado.')

    } catch (error) {
      toast.error(error)
    }
    setIsLoading(false)
  }

  return{
    isLoading,
    email,

    onSubmit,
    setEmail
  }
}