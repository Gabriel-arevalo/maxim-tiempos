"use client"

import { Button } from "./Button";
import { useLogingForm } from "@/hooks/useLoginForm";
import { Form } from "./Form";


export const LoginForm = () => {

  const {
    user,
    isLoading,
    onChange,
    onSubmit
  } = useLogingForm()

  const { email, password } = user

  return (
    <Form onSubmit={onSubmit}>

      <div className="mt-7">
        <input
          type="email"
          placeholder="Correo electronico"
          name="email"
          value={email}
          onChange={onChange}
          className="mt-1 block w-full border-none bg-gray-100 h-11 p-1 rounded-xl shadow-lg hover:bg-primary/40 focus:bg-primary/30 focus:ring-0 hover:placeholder-white " />
      </div>

      <div className="mt-7">
        <input
          type="password"
          placeholder="Contraseña"
          name="password"
          value={password}
          onChange={onChange}
          className="mt-1 block w-full border-none bg-gray-100 h-11 p-1 rounded-xl shadow-lg hover:bg-primary/40 focus:bg-primary/30 focus:ring-0 hover:placeholder-white " />
      </div>

      <div className="mt-7">
        <Button
          type="submit"
          isLoading={isLoading}
          label="Iniciar"
          className="bg-gradient-to-r from-orange-300  to-maxim-color w-full py-3 mt-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
        />
      </div>
    </Form>

  )
}