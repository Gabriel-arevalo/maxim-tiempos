import { useContext, useState } from "react";

import { useSession } from "next-auth/react";
import { toast } from 'react-hot-toast';

import { AppContext } from "@/context/AppContext";

export const useInformationForm = () => {

  const { setIsUpdated } = useContext( AppContext );
  const { data: session } = useSession()
  const [fecha, setFecha] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false)
  const [employeeInfo, setEmployeeInfo] = useState({
    actividad:"pozo",
    operadora:"EC",
    turno:"dia",
    comentarios:""
  })

  const onChange = (e) => {
    setEmployeeInfo({
      ...employeeInfo,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async(e) => {
    e.preventDefault();

    const fechaLimiteInferior = new Date('2024-01-01');
    const fechaLimiteSuperior = new Date('2024-12-31')

    if(fecha < fechaLimiteInferior || fecha > fechaLimiteSuperior){
      return toast.error('Fecha fuera de rango')
    }

    if( employeeInfo.actividad ==='' || employeeInfo.operadora ==='' || employeeInfo.comentarios.trim()==='' ){
      return toast.error('Ingresa todos los campos animal!!')
    }

    const currentMonth = new Date(fecha).getMonth() + 1

    const infoObj = {
      ...employeeInfo,
      fecha,
      id: session?.user?._id,
      currentMonth
    }

    try {
      setIsLoading(true)
      const res = await fetch("api/tiempo", {
        method: 'POST',
        headers: {
          "Content-Type":"applicacion/json"
        },
        body: JSON.stringify( infoObj )
      })

     if(res.ok){
      setEmployeeInfo( prev => ({...prev, comentarios: ""}))
      toast.success('Registro creado!!')
     }else{
      const { message } = await res.json()
      toast.error( message )
     }
     
     setIsLoading(false)
     
     setIsUpdated( true )

     
    } catch (error) {
      toast.error('Ups, algo salió mal!!!')
    }

  }
  
  return{
    isLoading,
    employeeInfo,
    session,
    fecha,
    
    setFecha,
    onChange,
    onSubmit,
  }
}