import Image from "next/image"

import { Notification } from "./Notification"

export const Form = ({ children, onSubmit }) => {
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
              { children }
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}