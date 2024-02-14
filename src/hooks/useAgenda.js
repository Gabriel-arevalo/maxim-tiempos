
import { useContext, useEffect, useRef, useState } from "react"

import { useSession } from "next-auth/react"
import { toast } from "react-hot-toast"
import { MdDeleteForever } from "react-icons/md";

import { AppContext } from "@/context/AppContext"
import { Button } from "@/components/Button"
import { Loading } from "@/components/Loading";

const appData = {
  eventsInStorage: {},
  descansosFull: {}
}

export const useAgenda = () => {

  const { isUpdated, setIsUpdated } = useContext(AppContext)
  const { data: session } = useSession()
  const [events, setEvents] = useState([])
  const [descansos, setDescansos] = useState({})
  const [isLoading, setIsLoading] = useState(false)


  const monthBeforeRender = useRef(new Date().getMonth() + 1)
  const isRendered = useRef(false)
  const currentMonth = useRef(new Date().getMonth() + 1);


  const getEvents = async (month) => {
    if (!session) return

    const { eventsInStorage, descansosFull } = JSON.parse(
      localStorage.getItem('appData') ||
      JSON.stringify(appData))

    const { user: { _id } } = session;

    if (!isUpdated && !!eventsInStorage[month]) {
      setDescansos(descansosFull[month])
      return
    }
    setIsLoading(true)

    try {
      const resp = await fetch(`/api/tiempo/${_id}?month=${month}`);
      const { cellValues,
        descansosAcumMesActual,
        descansosAcumMesAnterior } = await resp.json()


      const noPozo = ['DE', 'LI', 'DE', 'BA', 'FE']

      const apiEvents = cellValues.map(({ cellValue, day, note }) => {
        const title = cellValue + (note ? `-${note}` : '')
        let backgroundColor = '';

        if (!noPozo.includes(cellValue)) {
          backgroundColor = '#615298'
        } else if (cellValue === 'DE' || cellValue === 'VA' || cellValue==='FE') {
          backgroundColor = '#96be25'
        } else if (cellValue === 'LI') {
          backgroundColor = '#c0bad6'
        } 

        const dayFormated = day < 10 ? '0' + day : day
        const monthFormated = month < 10 ? '0' + month : month

        const start = `2024-${monthFormated}-${dayFormated}`    //   OJO - CAMBIAR
        return {
          title,
          start,
          display: 'auto',
          backgroundColor,
          classNames: ['event-agenda-size'],
          editable: true
        }
      })

      setIsLoading(false)

      const eventsInSorageStr = JSON.stringify(eventsInStorage)
      const apiEventsStr = JSON.stringify(apiEvents)

      if (!!eventsInStorage[month] && eventsInSorageStr === apiEventsStr) return

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
      setIsUpdated(false)
      setEvents(eventsToRender)
      setDescansos(descansosFull[month])
    } catch (error) {
      toast.error(error.message)
    }

  }

  const startDeleteEvent = ({ event: { _instance } }) => {
    toast.dismiss()
    const end = _instance.range.end
    const endDate = new Date(end).getTime()

    const resta = new Date().getTime() - endDate
    const diasdiFerencia = Math.round(resta/ (1000*60*60*24)) // Obtiene dias de diferencia

    if( diasdiFerencia > 1 ){
      return toast.error('Fecha superior a dos dias. No puede editar!')
    }

    const day = Number(end.toString().split(' ')[2]);

    toast(
      (t) => (
        <span className="flex flex-col items-center" >
          Desea eliminar el evento?

          <Button
            label="Eliminar"
            className={'mt-1'}
            onClick={() => handleDeleteEvent(day)}
          />

        </span>
      ),
      {
        icon: <MdDeleteForever size={30} />,
      }
    );

  }

  const handleDeleteEvent = async (day) => {

    const { user: { _id } } = session;
    toast.dismiss()

    setIsLoading(true)

    await fetch(`/api/tiempo/${_id}?month=${currentMonth.current}&day=${day}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "applicacion/json"
      },
    })
    setIsUpdated(true)
    setIsLoading(false)

  }

  const handleCalChange = ({ endStr }) => {
    const nextMonth = Number(endStr.split('-')[1])

    if (nextMonth === 1) {
      currentMonth.current = 12
    } else {
      currentMonth.current = nextMonth - 1
    }

    if (monthBeforeRender.current === currentMonth.current) return
    monthBeforeRender.current = currentMonth.current;
    getEvents(currentMonth.current)
  }

  useEffect(() => {
    const month = new Date().getMonth() + 1
    const { eventsInStorage, descansosFull } = JSON.parse(
      localStorage.getItem('appData') || JSON.stringify(appData
      ))
    const eventsToRender = Object.values(eventsInStorage).flat()
    setEvents(eventsToRender)
    setDescansos(descansosFull[month] || {})
  }, [])


  useEffect(() => {
    if (isUpdated || !isRendered.current) getEvents(currentMonth.current)
  }, [isUpdated])

  useEffect(() => {
    isRendered.current = true
  }, [])


  return {
    events,
    descansos,
    isLoading,

    startDeleteEvent,
    handleCalChange
  }

}