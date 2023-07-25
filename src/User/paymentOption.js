import React,{useState,useEffect} from 'react'
import {Row,Col,Container,Table} from 'react-bootstrap'
import Msewa from './Msewa'
import payment from '../assets/logo/logo.png'
import axios from 'axios';
import useLoader from '../common/useLoader'

const PaymentOption = (props) => {
    const {hospitalId} = props;
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${sessionStorage.getItem('token')}`
            }
        }
    })
    let {loadingHandler} = useLoader()
    
    const detachProcess = (e)=>{
        let data = e.target.name;
        loadingHandler(true)
        axios.post(process.env.REACT_APP_URL+"deleteMyTicket",{"token":sessionStorage.getItem('ticketKey')},auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                sessionStorage.removeItem("ticketKey");
                sessionStorage.removeItem("bankKey")
                if(data == "Cancel")
                {
                    window.location.href = "/hospitals"
                }
                else
                {
                    window.location.href = "/buyticket/"+hospitalId
                }
            }
            loadingHandler(false)
        })
        .catch((err)=>{
            console.log(err);
        })
      
    }

    return (
        <React.Fragment>
               <>
                       <Row className='justify-content-center'>
                           <Col lg={4} className="line__border my-auto">

                           </Col>
                           <Col lg={4}>
                               <h3 className="text-center" style={{fontSize:'20px'}}>Payment Method</h3>
                           </Col>
                          <Col lg={4} className="line__border my-auto">

                           </Col>
                  
                       </Row>
                       <Col lg={12} className="text-center myPayModal my-5">
                           <a href="#" data-bs-toggle="modal" data-bs-target="#Msewa" className="p-4" style={{backgroundColor:'#f0f0f0', borderRadius:'13px',boxShadow:'4px 3px 8px #424242'}}><img src={payment} alt="Msewa" className="" style={{width:'100px'}}></img></a>
                           <Msewa/>
                           </Col>
                        <Row>
                            <Col lg={6}>
                            <button type="button" className="btn btn-lg mt-3 mb-4 bg-white reg__btn" style={{boxShadow:"4px 3px 8px #424242",padding:"7px 30px",float:"right"}} name="Cancel" onClick={(e)=>{detachProcess(e)}}> Cancel </button>
                            </Col>
                            <Col lg={6}>
                            <button type="button" className="btn btn-lg mt-3 mb-4 bg-white reg__btn" style={{boxShadow:"4px 3px 8px #424242",padding:"7px 30px",float:"left"}} name="Back" onClick={(e)=>{detachProcess(e)}}> Back </button>
                                
                            </Col>
                        </Row>
                        </>

        </React.Fragment>
    )
}

export default PaymentOption
