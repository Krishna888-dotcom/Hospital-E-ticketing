import React,{useState,useEfect} from 'react'

const useCommon = () => {
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${sessionStorage.getItem('token')}`
            }
        }
    })
   

    const digitizer = (num)=>{
        let n = num;
        if(n < 10)
        {
            n = "0"+n;
        }
        return n;
    }
   
    const getFormattedToday = (date)=>{
        return `${date.getFullYear()}-${digitizer(date.getMonth()+1)}-${digitizer(date.getDate())}`
    }

   

    return {getFormattedToday,auth};
}

export default useCommon
