import { NextResponse } from "next/server";

import { googleSheetConnect } from "@/helpers/googleSheetsConnect";
import { findEmployeeRowById } from "@/helpers/findEmployeeRow";

export async function GET(request, { params }){

  const { id } = params;
  const { searchParams } = new URL( request.url )
  const month = Number(searchParams.get('month'))

  const sheet = await googleSheetConnect(month)
  const { itWasFound, fila } = findEmployeeRowById( id, sheet );

  if(!itWasFound){
    return NextResponse.json({message: 'Empleado no encontrado en BD'}, { status: 404 })
  }

  const cellValues = []

  for( let i = 2; i <= (30+2); i++ ){

    const cellValue = sheet.getCell(fila, i).value
    if(cellValue){
      const cellNote = sheet.getCell(fila, i).note
      cellValues.push({
        cellValue, 
        day: (i-1), 
        note: cellNote ?? ''
      })
    }
  }

  const descansosAcumMesActual = sheet.getCell(fila, 45).value
  const descansosAcumMesAnterior = sheet.getCell(fila, 44).value
 
  return NextResponse.json( { 
    cellValues,
    descansosAcumMesActual,
    descansosAcumMesAnterior
   }, {status:200 })
}

export async function DELETE(request, { params }){
  const { id } = params;
  const { searchParams } = new URL( request.url )
  const month = Number(searchParams.get('month'))
  const day = Number(searchParams.get('day'))

  const sheet = await googleSheetConnect(month)

  const { itWasFound, fila } = findEmployeeRowById( id, sheet)

  if(!itWasFound){
    return NextResponse.json({message: 'Empleado no encontrado en BD'}, { status: 404 })
  }

  const celda = sheet.getCell(fila, day + 1)
  celda.value = ''
  celda.note = ''
  await sheet.saveUpdatedCells()

  return NextResponse.json({message:'eliminado'})
}