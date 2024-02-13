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
    <div className='flex flex-col flex-1 gap-2'>
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
          aspectRatio={1.6}
          eventClick={ startDeleteEvent  }
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
                  <p className='text-lg'>Descansos acumulados</p>
                  <span className='text-sm'>mes anterior</span>
                </div>

                <span className={`text-2xl ${descansosAcumMesAnterior < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {descansosAcumMesAnterior}
                </span>
              </div>


              <div className='flex items-center gap-4'>

                <div className='flex flex-col items-center'>
                  <p className='text-lg'>Descansos acumulados</p>
                  <span className='text-sm'>mes actual</span>
                </div>

                <span className={`text-2xl ${descansosAcumMesActual < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {descansosAcumMesActual}
                </span>
              </div>

            </div>
          )
      }



    </div>

  )
}

