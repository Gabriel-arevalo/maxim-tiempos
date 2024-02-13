"use client"

import { WiDaySunny } from "react-icons/wi";
import { MdOutlineNightlight } from "react-icons/md";
import DatePicker, { registerLocale } from "react-datepicker";
import { RadioGroup } from '@nextui-org/radio';
import { Textarea } from '@nextui-org/input';
import es from 'date-fns/locale/es';

import { SelectComponent } from './SelectComponent';
import { activities, operadoras } from '@/data';
import { CustomRadio } from './CustomRadio';
import { Button } from './Button';
import { Notification } from './Notification'

import "react-datepicker/dist/react-datepicker.css";
import { useInformationForm } from "@/hooks/useInformationForm";

registerLocale('es', es)


export const InformationForm = () => {
  
  const {
    isLoading,
    employeeInfo,
    session,
    fecha,
    setFecha,
    onChange,
    onSubmit,
  } = useInformationForm()

  return (
    <section className=" min-w-[40%] shadow-lg ">
      <Notification />
      <div className="bg-slate-300 rounded p-3 h-full">
        <h2 className="subtitle">{ session?.user?.position }</h2>
        <h1 className=" text-xl text-black">{ session?.user?.fullName }</h1>

        <form onSubmit={ onSubmit } className=" mt-12 ">
          <div className="border  border-maxim-color rounded p-2 mb-3 sm:flex sm:justify-between">
            <div className='flex-1 md:pr-2'>
              <p className="subtitle mb-3">Tipo de actividad:<span className='text-maxim-color'>*</span></p>
              <div className=''>
                <SelectComponent 
                  data={ activities } 
                  name="actividad"
                  onChange={ onChange }
                  defaultKey={ employeeInfo.actividad }
                  placeholder="Selecciones una actividad"
                />
              </div>
            </div>
            <div>
              <p className="subtitle mt-5 sm:mt-0 mb-4">Fecha:<span className='text-maxim-color'>*</span></p>
              <DatePicker 
                selected={fecha} 
                onChange={(date) => setFecha(date)} 
                className='text-sm text-gray-500 p-1'
                maxDate={new Date()}
              />
            </div>
          </div>

          {
            employeeInfo.actividad === 'pozo' && 
            (

              <div className={`border border-maxim-color rounded p-2 mb-3 sm:flex sm:flex-row`}>
                <div className='flex-1 md:pr-2'>
                  <p className="subtitle  mb-3 ">Operadora:<span className='text-maxim-color'>*</span></p>
                  <div className=''>
                    <SelectComponent 
                      data={ operadoras }
                      name="operadora"
                      onChange={ onChange }
                      placeholder="Seleccione una operadora"
                      defaultKey={ employeeInfo.operadora }
                    />
                  </div>
                </div>

                <div className='mt-7 sm:mt-0'>
                  <p className="subtitle mb-3 ">Tipo de turno:<span className='text-maxim-color'>*</span></p>
                  <RadioGroup defaultValue={ employeeInfo.turno } onChange={ onChange } name='turno'>
                    <CustomRadio description="Día" value="dia" >
                      <WiDaySunny />
                    </CustomRadio>
                    <CustomRadio description="Noche" value="noche" >
                      <MdOutlineNightlight />
                    </CustomRadio>

                  </RadioGroup>
                </div>
              </div>

            )
          }
        
          <div>
            <p className="subtitle mb-3 ">Comentarios:<span className='text-maxim-color'>*</span></p>
            <Textarea 
               placeholder="Pozo/Operación/Otros?... especifique"
               className="max-w-full"
               onChange={ onChange }
               name='comentarios'
               value={ employeeInfo.comentarios }
               size='lg'
            />
          </div>
          <Button 
            label="Enviar" 
            type="submit"
            className=" mt-8 px-12 bg-gradient-to-r from-orange-300  to-maxim-color transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105" 
            isLoading={ isLoading }
          />
        </form>
      </div>
    </section>
  )
}

<div>

</div>
