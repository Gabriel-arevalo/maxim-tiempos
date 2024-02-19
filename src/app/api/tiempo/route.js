import { NextResponse } from "next/server";

import { googleSheetConnect } from "@/helpers/googleSheetsConnect";
import { findEmployeeRowById } from "@/helpers/findEmployeeRow";


export async function POST(request) {

  let sigla;
  const body = await request.json()
  const intlDateObj = new Intl.DateTimeFormat('en-US', {
    timeZone: "America/New_York"
  });
  const fecha = body.fecha
  body.fecha = JSON.stringify(new Date(intlDateObj.format(new Date(body.fecha))))

  const dateSplitted = body.fecha.split('T')[0].split('-')
  const day = Number(dateSplitted[2])

  if(body.actividad === 'pozo'){
    sigla = body.operadora[0] + body.turno[0].toUpperCase()
  }else{
    sigla = body.actividad
  }


  const sheet = await googleSheetConnect(body.currentMonth);

  const { itWasFound, fila } = findEmployeeRowById( body.id, sheet)

  if(!itWasFound){
    return NextResponse.json({message: 'Empleado no encontrado en BD'}, { status: 404 })
  }

  const celda = sheet.getCell(fila, day + 1)

  if(!!celda.value){
    const resta = new Date().getTime() - new Date(fecha).getTime()
    const diasdiFerencia = Math.round(resta/ (1000*60*60*24)) // Obtiene dias de diferencia

    if( diasdiFerencia > 1 ){
      return NextResponse.json({message: 'Fecha a editar superior a un día'}, {status: 403})
    }
    
  }

  celda.value = sigla
  celda.note = body.comentarios
  await sheet.saveUpdatedCells()

  return NextResponse.json({ message: 'POST' }, {status: 201})
}

