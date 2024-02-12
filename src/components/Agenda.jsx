'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es';
import { useAgenda } from '@/hooks/useAgenda';
import { Loading } from './Loading';

export const Agenda = () => {

  const {
    events, 
    isLoading,
    descansos:{
      descansosAcumMesActual,
      descansosAcumMesAnterior
    }, 
    handleCalChange} = useAgenda()

  const renderEventContent = (eventInfo) => {
    return <><i>{eventInfo.event.title}</i></>
  }

  return (
    <div className='flex  flex-col flex-1 pb-3'>
      <div className='flex-1'>
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            weekends={true}
            events={events}
            eventContent={renderEventContent}
            height={ "auto" }
            locale={esLocale}
            datesSet={handleCalChange}
            validRange={{
              start: '2024-01-01',
              end: '2025-01-01'
            }}
            loading={ isLoading }
        />

      </div>

      {
        isLoading
        ?(
         <div className='flex-1 flex justify-center items-center'><Loading /></div>
        )
        :(
          <div className=" flex-1 w-full mt-1">
            <div className='border border-maxim-color h-full rounded p-1 flex justify-around'>
              <div className='flex flex-col items-center'>
                <p className='text-lg'>Descansos acumulados</p>
                <p className='text-sm'>mes anterior</p>
                <span 
                  className={`text-2xl ${ descansosAcumMesAnterior < 0 ? 'text-red-500': 'text-green-500'}`}>
                  { descansosAcumMesAnterior }
                </span>
              </div>
    
              <div className='flex flex-col items-center'>
                <p className='text-lg'>Descansos acumulados</p>
                <p className='text-sm'>mes actual</p>
                <span 
                  className={`text-2xl ${ descansosAcumMesActual < 0 ? 'text-red-500': 'text-green-500'}`}>
                  { descansosAcumMesActual }
                </span>
              </div>
            </div>
          </div>
        )
      }
      
    

    </div>
   
  )
}

