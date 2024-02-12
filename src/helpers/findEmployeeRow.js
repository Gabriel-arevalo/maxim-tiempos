export const findEmployeeRowById = ( id, sheet ) =>{

  let fila = 0;
  let itWasFound = false

  while( fila < 200 ){
     const currentCellValue = sheet.getCell( fila, 0 ).value
    if( currentCellValue == id ){
      itWasFound = true;
      break;
    }
    fila++
  }

  return { itWasFound, fila}

}