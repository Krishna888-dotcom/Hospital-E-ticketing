import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Skeleton from '../common/Skeleton'
import useLoader from '../common/useLoader'

const useHospital = (hospitalId) => {
    //state goes here 
    let [hospital,setHospital] = useState({});
    let [shifts,setShifts] = useState({});
    let [ticketDetail,setTicketDetail] = useState({});
    let {skeletonLoading,skeletonHandler} = useLoader();
    let [shiftError,setShiftError] = useState("");
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${sessionStorage.getItem('token')}`
            }
        }
    })


    //effect goes here
    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"hospitalTickets/"+hospitalId,auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setHospital(
                    response.data.data
                )
                setShifts(
                    response.data.shiftData
                )
            }
            else
            {
                setHospital({});
                setShifts({})
                setShiftError(
                    response.data.error['random']
                )
            }
        })
        .catch((err)=>{
            setShiftError(
               "Inappropriate"
            )
        })
    },[])

    useEffect(()=>{
        skeletonHandler(true)
        axios.post(process.env.REACT_APP_URL+"showBill",{"token":sessionStorage.getItem('ticketKey')},auth.config)
        .then((response)=>{ 
            if(response.data.success == true)
            {
                setTicketDetail(
                    
                    response.data.data
                    
                )
            }
            else
            {  
                    setTicketDetail({})
            }
            skeletonHandler(false)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])


   


    return {hospital,shifts,ticketDetail,skeletonLoading,skeletonHandler,shiftError};
}

export default useHospital
