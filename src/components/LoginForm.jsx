"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Notification } from "./Notification";
import { Button } from "./Button";


export const LoginForm = () => {

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

    if(!validEmail.test(email)){
      return toast.error('Ingresa un e-mail válido')
    }

    if(password.trim() === ''){
      return toast.error('Ingresa una contraseña')
    }

    setIsLoading(true)

    try {
      const res = await signIn('credentials',{
        email, 
        password,
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
  

  return (
    <div className="font-sans">
      <Notification />
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-black/70 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
          <div className="card bg-primary/80 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            <Image
              src="/maxim-logo.png"
              width={100}
              height={100}
              alt="maxim-logo"
              className="absolute"
            />
            <label className="block mt-3 text-2xl text-gray-700 text-center font-semibold">
              Inicia Sesión
            </label>
            <form onSubmit={ onSubmit } className="mt-10">

              <div className="mt-7">
                <input 
                  type="email" 
                  placeholder="Correo electronico" 
                  name="email" 
                  value={ email }
                  onChange={ onChange }
                  className="mt-1 block w-full border-none bg-gray-100 h-11 p-1 rounded-xl shadow-lg hover:bg-primary/40 focus:bg-primary/30 focus:ring-0 hover:placeholder-white " />
              </div>

              <div className="mt-7">
                <input 
                  type="password" 
                  placeholder="Contraseña" 
                  name="password" 
                  value={ password }
                  onChange={ onChange }
                  className="mt-1 block w-full border-none bg-gray-100 h-11 p-1 rounded-xl shadow-lg hover:bg-primary/40 focus:bg-primary/30 focus:ring-0 hover:placeholder-white " />
              </div>

              <div className="mt-7">
                <Button 
                  type="submit"
                  isLoading={ isLoading }
                  label="Iniciar"
                  className="bg-gradient-to-r from-orange-300  to-maxim-color w-full py-3 mt-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                />
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}