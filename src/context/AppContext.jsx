'use client'

const { createContext, useState } = require("react");


export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [isUpdated, setIsUpdated] = useState(false);

  return(
    <AppContext.Provider value={{ isUpdated, setIsUpdated }}>
      { children }
    </AppContext.Provider>
  )

}