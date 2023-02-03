import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate, Route} from 'react-router-dom'
const ProtectedRoute = ({componant:Componant, ...rest}) => {
  const {loading, isAuthenticated} = useSelector((state)=>state.user)
  return (
    <>
    {!loading && (
      <Route 
        {...rest}
        render={(props)=>{
          if(!isAuthenticated){
            return  <Navigate to="/login"/>
          }
          return <Componant {...props} />;
        }}
      />
    )}

    </>
  )
}

export default ProtectedRoute