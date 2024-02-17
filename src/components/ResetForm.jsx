'use client'

import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { useResetForm } from "@/hooks/useResetForm";
import { Loading } from "./Loading";

export const ResetForm = ({ params }) => {

  const {
    isLoading,
    password,
    password2,
    isValidating,
    onSubmit,
    onChange
  } = useResetForm(params)

  if( isValidating ) return <div className=" h-screen flex justify-center items-center"><Loading className=" h-32 w-32"/></div>

  return (
    <Form title="Reset Password" onSubmit={ onSubmit }>
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
        <input
          type="password"
          placeholder="Confirma la contraseña"
          name="password2"
          value={password2}
          onChange={onChange}
          className="mt-1 block w-full border-none bg-gray-100 h-11 p-1 rounded-xl shadow-lg hover:bg-primary/40 focus:bg-primary/30 focus:ring-0 hover:placeholder-white " />
      </div>

      <div className="mt-7">
        <Button
          type="submit"
          isLoading={isLoading}
          label="Confirmar"
          className="bg-gradient-to-r from-orange-300  to-maxim-color w-full py-3 mt-2 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
        />
      </div>
    </Form>
  );
}