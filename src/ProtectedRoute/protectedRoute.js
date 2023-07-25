import React from 'react'
import {Route} from 'react-router-dom';

const ProtectedRoute = ({naming,component:Component,...rest}) => {
   
    //variable goes here
    let token = sessionStorage.getItem('token');
    
    return(
        <Route
        {...rest}
        render = {(props)=>{
            if(token)
            {
                if(naming == "Login")
                {
                    window.location.href= "/unavailable"
                }
                else
                {
                    return <Component {...props}/>
                }
                
            }
            else
            {
                if(naming == "Login")
                {  
                    return <Component {...props}/>
                }
                else
                {
                    window.location.href= "/unavailable"
                }
            }
        }}/>
    )
   
}

export default ProtectedRoute
