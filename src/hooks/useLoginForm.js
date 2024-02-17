import { isValidEmail } from "@/helpers/isValidEmail";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { toast } from "react-hot-toast";

export const useLogingForm = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    email:'',
    password:'',
  })

  const router = useRouter()

  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async(e) => {
    e.preventDefault()

    const trimmedPass  = password.trim()

    if(!isValidEmail(email)){
      return toast.error('Ingresa un e-mail válido')
    }

    if(trimmedPass === ''){
      return toast.error('Ingresa una contraseña')
    }

    setIsLoading(true)

    try {
      const res = await signIn('credentials',{
        email: email.trim(), 
        password: trimmedPass,
        redirect:false
      })

      if(res.error){
        setIsLoading(false)
        return toast.error('Credenciales inválidas')
      }
      router.replace('/dashboard')
    } catch (error) {
      toast.error(error.message)
    }
    setIsLoading(false)
  } 

  useEffect(() => {
    localStorage.clear()
  }, [])

  return{
    isLoading,
    user,

    onChange,
    onSubmit
  }

}