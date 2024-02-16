'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es';
import { useAgenda } from '@/hooks/useAgenda';
import { Loading } from './Loading';
import { useRef } from 'react';

export const Agenda = () => {

  const {
    events,
    isLoading,
    titleAgendaObj,
    descansos: {
      descansosAcumMesActual,
      descansosAcumMesAnterior
    },
    handleCalChange,
    startDeleteEvent
   } = useAgenda()



  const renderEventContent = (eventInfo) => {
    return <><i>{eventInfo.event.title}</i></>
  }

  return (
    <div className='mt-3 sm:mt-0 flex flex-col flex-1 gap-2'>
      <div className='basis-10/12 overflow-y-scroll'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          weekends={true}
          events={events}
          eventContent={renderEventContent}
          // height={"auto"}
          locale={esLocale}
          datesSet={handleCalChange}
          validRange={{
            start: '2024-01-01',
            end: '2025-01-01'
          }}
          loading={isLoading}
          aspectRatio={1.7}
          eventClick={ startDeleteEvent  }
          titleFormat={titleAgendaObj}
        />

      </div>

      {
        isLoading
          ? (
            <div className=' flex flex-1 justify-center items-center'><Loading /></div>
          )
          : (
            <div className="w-full flex-1 flex items-center justify-around border border-maxim-color">

              <div className='flex items-center gap-4'>

                <div className='flex flex-col items-center'>
                  <p className='text-sm sm:text-xl md:text-2xl'>Descansos acumulados</p>
                  <span className='text-sm'>mes anterior</span>
                </div>

                <span className={`text-lg sm:text-xl md:text-2xl ${descansosAcumMesAnterior < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {descansosAcumMesAnterior}
                </span>
              </div>

              <div className='flex items-center gap-4'>

                <div className='flex flex-col items-center'>
                  <p className='text-sm sm:text-xl md:text-2xl'>Descansos</p>
                  <span className='text-sm'>disponibles</span>
                </div>

                <span className={`text-lg sm:text-xl md:text-2xl ${descansosAcumMesActual < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {descansosAcumMesActual}
                </span>
              </div>

            </div>
          )
      }

    </div>

  )
}

