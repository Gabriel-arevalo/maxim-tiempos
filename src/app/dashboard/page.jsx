import Image from "next/image";
import { InformationForm } from "@/components/InformationForm";

import { Agenda } from "@/components/Agenda";
import { ButtonWrapper } from "@/components/ButtonWrapper";


export default function Dashboard() {
  return (
    <main className="  h-screen flex  flex-col">
      <div className="flex justify-between items-center mb-3 p-2 bg-gradient-to-r from-orange-300  to-maxim-color shadow-xl">
        <Image 
          width={ 150 } 
          height={ 150} 
          src="/maxim-logo.png" 
          alt="maxim-logo"
        />

        <ButtonWrapper />
      </div>

      <div className="md:flex md:flex-row flex-1  gap-6 px-3">
        <InformationForm />
        <div className="flex-1 flex flex-col items-center">
          <Agenda />
        </div>
        
      </div>
    </main>
  )
}