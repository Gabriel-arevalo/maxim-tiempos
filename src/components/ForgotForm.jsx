"use client"

import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Notification } from "@/components/Notification";
import { useForgotForm } from "@/hooks/useForgotForm";

export const ForgotForm = () => {

  const { 
    email, 
    onSubmit, 
    isLoading,
    setEmail
} = useForgotForm()
  
  return (
    <Form title="Forget Password" onSubmit={ onSubmit }>
      <Notification />
      <div className="mt-7">
        <input
          type="email"
          placeholder="Correo electronico"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border-none bg-gray-100 h-11 p-1 rounded-xl shadow-lg hover:bg-primary/40 focus:bg-primary/30 focus:ring-0 hover:placeholder-white " />
      </div>

      <div className="mt-7">
        <Button
          type="submit"
          isLoading={isLoading}
          label="Enviar"
          className="bg-gradient-to-r from-orange-300  to-maxim-color w-full py-3 mt-2 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
        />
      </div>
    </Form>
  );
}

