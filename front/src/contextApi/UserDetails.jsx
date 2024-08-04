import React, { createContext, useContext, useEffect, useState } from 'react'
import { getUser } from '../services/allApis'
import { refreshContext } from './Refresh'

export const userContext= createContext()
function UserDetails({children}) {
  const {refresh} = useContext(refreshContext)
    const [userDetails,SetUserDetails] = useState('')
    useEffect(()=>{
        const user=JSON.parse(sessionStorage.getItem('userDetails'))
        SetUserDetails(user)
        },[refresh])
      
  return (
    <>
        <userContext.Provider value={{userDetails}}>
            {children}
        </userContext.Provider>
    </>
  )
}

export default UserDetails