
import { useContext, useEffect, useRef, useState } from "react"

import { useSession } from "next-auth/react"
import { toast } from "react-hot-toast"

import { AppContext } from "@/context/AppContext"

const appData = {
  eventsInStorage:{},
  descansosFull:{}
}

export const useAgenda = () => {

  const { isUpdated, setIsUpdated } = useContext(AppContext)
  const { data: session } =  useSession()
  const [events, setEvents] = useState([])
  const [descansos, setDescansos] = useState({})
  const [isLoading, setIsLoading] = useState(false)


  const monthBeforeRender = useRef( new Date().getMonth() + 1)
  const isRendered = useRef(false)
  const currentMonth = useRef( new Date().getMonth() + 1);


  const getEvents = async(month) => {
    if(!session) return

    const { eventsInStorage, descansosFull } = JSON.parse(
      localStorage.getItem('appData') || 
      JSON.stringify( appData ))

    const { user:{ _id } } = session;

    if( !isUpdated && !!eventsInStorage[month] ){
      setDescansos( descansosFull[month] )
      return
    }
    setIsLoading(true)
    console.log(month);
    try {
      const resp = await fetch(`/api/tiempo/${_id}?month=${ month }`);
      const { cellValues, 
        descansosAcumMesActual, 
        descansosAcumMesAnterior } = await resp.json()

      const apiEvents = cellValues.map( ({ cellValue, day, note }) => {
        const title = cellValue + (note ? `-${ note }`: '')
  
        const dayFormated = day < 10 ? '0' + day : day
        const monthFormated = month < 10 ? '0' + month : month
  
        const start = `2024-${ monthFormated }-${ dayFormated }`    //   OJO - CAMBIAR
        return{ title, start, display: 'auto' }
      })

      setIsLoading(false)

      const eventsInSorageStr = JSON.stringify(eventsInStorage)
      const apiEventsStr      = JSON.stringify(apiEvents)

      if(!!eventsInStorage[month] && eventsInSorageStr === apiEventsStr ) return

      eventsInStorage[month] = apiEvents

      descansosFull[month] = {
        descansosAcumMesActual,
        descansosAcumMesAnterior
      }

      localStorage.setItem('appData', JSON.stringify({
        eventsInStorage,
        descansosFull
       }))
 
      const eventsToRender = Object.values(eventsInStorage).flat()
      setIsUpdated( false )
      setEvents( eventsToRender )
      setDescansos( descansosFull[month] )
    } catch (error) {
      toast.error(error.message)
    }

  }

  const handleCalChange = ({ endStr }) =>{
    const nextMonth = Number(endStr.split('-')[1])

    if( nextMonth === 1 ){
       currentMonth.current = 12
    }else{
       currentMonth.current = nextMonth-1
    }

    if( monthBeforeRender.current === currentMonth.current ) return
    monthBeforeRender.current = currentMonth.current;
    getEvents( currentMonth.current )
  }

   useEffect(() => {
    const month = new Date().getMonth() + 1
    const {eventsInStorage, descansosFull} = JSON.parse(
      localStorage.getItem('appData') || JSON.stringify( appData 
    ))
    const eventsToRender  = Object.values( eventsInStorage ).flat()
    setEvents(eventsToRender)
    setDescansos( descansosFull[month] || {})
   }, [])
   

  useEffect(() => {
    if( isUpdated || !isRendered.current ) getEvents(currentMonth.current)
  }, [isUpdated])

  useEffect(() => {
    isRendered.current = true
  }, [])
  

  return{
    events,
    descansos,
    isLoading,

    handleCalChange
  }

}