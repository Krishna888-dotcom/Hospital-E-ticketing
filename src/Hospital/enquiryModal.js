import React,{useState,useEffect} from 'react'
import {toast} from 'react-toastify';
import axios from 'axios'

const EnquiryModal = (props) => {
    const {nomenclature,data} = props;

    const addToBot = (e)=>{
        axios.post(process.env.REACT_APP_URL+"addEnquiryToBot/"+data._id,{})
        .then((response)=>{
            if(response.data.success == true)
            {
                toast.success(response.data.message);
                window.location.reload();
            }
            else
            {
                toast.error(response.data.message)
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const solveEnquiry = (e)=>{
        axios.put(process.env.REACT_APP_URL+"solveEnquiry/"+data._id,{})
        .then((response)=>{
            if(response.data.success == true)
            {
                toast.success(response.data.message);
                window.location.reload();
            }
            else
            {
                toast.error(response.data.message)
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    return (
        <React.Fragment>
             <div class="modal fade" id={`${nomenclature}${data._id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel" style={{color:'red',fontSize:'20px',fontWeight:'bold'}}>Message</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">                    
                        <p className="mb-1">
                          <strong> {data.firstName} {data.lastName}: </strong>  
                        </p>
                        <p className="text-justify mb-2"> {data.enquiry} </p>

                        {
                            data.status == false&&
                            (
                                <div className="col-12">
                                        <button className="btn btn-success mt-5" onClick={(e)=>{addToBot(e)}} type="button" name="complete" style={{position: "relative",float: "right",left:"8px"}}>Add To Bot</button>
                                        <button className="btn btn-primary mt-5" onClick={(e)=>{solveEnquiry(e)}} type="button" name="complete" style={{position: "relative",float: "right"}}>Mark As Solved</button>
                                    
                                </div>    
                            )
                        }
                      
                                
                    </div>
                          
                    </div>
                   
                    </div>
                </div>
        </React.Fragment>
    )
}

export default EnquiryModal
