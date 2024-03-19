import Image from "next/image";
import { InformationForm } from "@/components/InformationForm";

import { Agenda } from "@/components/Agenda";
import { ButtonWrapper } from "@/components/ButtonWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function Dashboard() {

  const session = await getServerSession(authOptions)

  if(!session){
    redirect('/')
  }

  return (
    <main className="  h-screen flex  flex-col justify-between">
      <div className="flex justify-between items-center p-2 bg-gradient-to-r from-orange-300  to-maxim-color shadow-xl">
        <Image 
          width={ 150 } 
          height={ 150} 
          src="/maxim-logo.png" 
          alt="maxim-logo"
        />

        <ButtonWrapper />
      </div>

      <div className="md:flex md:flex-row flex-1  gap-6 p-3 max-w-[100rem]">
        <InformationForm />
        <div className="flex-1 flex flex-col">
          <Agenda />
        </div>
        
      </div>
    </main>
  )
}