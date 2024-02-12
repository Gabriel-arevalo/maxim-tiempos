import { NextResponse } from "next/server";

import { googleSheetConnect } from "@/helpers/googleSheetsConnect";
import { findEmployeeRowById } from "@/helpers/findEmployeeRow";

export async function POST(request) {

  let sigla;
  const body = await request.json()

  const day = Number(body.fecha.split('T')[0].split('-')[2])


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
  celda.value = sigla
  celda.note = body.comentarios
  await sheet.saveUpdatedCells()

  return NextResponse.json({ message: 'POST' }, {status: 201})
}

