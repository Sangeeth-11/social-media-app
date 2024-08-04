import React, { createContext, useState } from 'react'

export const refreshContext = createContext()
function Refresh({children}) {
    const [refresh,setRefresh]=useState("")
  return (
    <div>
        <refreshContext.Provider value={{refresh,setRefresh}}>
            {children}
        </refreshContext.Provider>
    </div>
  )
}

export default Refresh