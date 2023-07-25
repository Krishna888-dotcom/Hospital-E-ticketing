import React,{ useState, useEffect} from 'react'
import axios from 'axios';
import {toast} from 'react-toastify'
import Loader from '../common/loader'
import useLoader from '../common/useLoader'
import ProgressButton from '../common/progressButton'

const Delete = (props) => {
    let {ticketId} = props
    let {loading,loadingHandler} = useLoader();
    
    //state goes here
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${sessionStorage.getItem('token')}`
            }
        },
        
    })
    

    //handlers goes here
    const deleteTicket = (e)=>{
        loadingHandler(true)
        axios.delete(process.env.REACT_APP_URL+"deleteTicket/"+ticketId,auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                toast.success(response.data.message);
                window.location.reload();
               
                
            }
            else
            {
                toast.error(response.data.message);
            }
           
            loadingHandler(false)
            
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <React.Fragment>
            <div class="modal fade" id={`deleteTicket${ticketId}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel" style={{color:"red",fontSize:"25px",fontWeight:"bold"}}>Delete Ticket</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete this ticket?</p>
                    
                                    
                </div>
                <div class="modal-footer">
                    {
                        loading == true?
                        (
                            <ProgressButton/>
                        ):
                        (
                            <>
                            <button type="button" class="btn btn-danger" style={{ boxShadow: '4px 3px 8px #424242',padding: '7px 50px'}} onClick={(e)=>{deleteTicket(e)}}>Delete</button>
                            <button type="button" class="btn btn__Add" style={{ boxShadow: '4px 3px 8px #424242',padding: '7px 50px'}} data-bs-dismiss="modal">Close</button>
                            </>
                        )
                    }
                   
                    
                </div>
                </div>
            </div>
            </div>

            
        </React.Fragment>
    )
}

export default Delete
