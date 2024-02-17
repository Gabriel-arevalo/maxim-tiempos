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

    const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
    const trimmedEmail = email.trim()
    const trimmedPass  = password.trim()

    if(!validEmail.test(trimmedEmail)){
      return toast.error('Ingresa un e-mail válido')
    }

    if(trimmedPass === ''){
      return toast.error('Ingresa una contraseña')
    }

    setIsLoading(true)

    try {
      const res = await signIn('credentials',{
        email: trimmedEmail, 
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