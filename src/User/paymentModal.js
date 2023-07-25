import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {Container,Row,Col} from 'react-bootstrap'
import Loader from '../common/loader';
import PaymentLoader from '../common/paymentLoader'
import useLoader from '../common/useLoader';
import {toast} from 'react-toastify'

const PaymentModal = (props) => {
    const {nomenclature,hospitalId} = props;
    let {loading,loadingHandler,payLoading,paymentHandler} = useLoader();
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${sessionStorage.getItem('token')}`
            }
        }
    })
    if(nomenclature == "pay")
    {
        var heading = 
        <>
            Do you really want to pay the bill?
        </>
    }
    else
    {
        var heading = 
        <>
            Do you really want to cancel the payment?
        </>
    }

    const userDecision = (e)=>{
        if(nomenclature == "pay")
        {
            paymentHandler(true);
            axios.post(process.env.REACT_APP_URL+"payTheBill",{"token":sessionStorage.getItem('bankKey'),"ticketToken":sessionStorage.getItem('ticketKey')},auth.config)
            .then((response)=>{
                if(response.data.success == true)
                {
                    toast.success(response.data.message);
                    sessionStorage.removeItem("bankKey")
                    window.location.href = "/paymentSuccess"
                }
                else
                {
                    toast.error(response.data.message);
                    setTimeout(()=>{
                        if(response.data.message == "Ticket Reservation Time Out.")
                        {
                            sessionStorage.removeItem("bankKey")
                            sessionStorage.removeItem("ticketKey")
                            window.location.href = "/buyticket/"+props.match.params.hospitalId
                        }
                        else
                        {
                            window.location.reload();
                        }
                        
                    },5000)
                   
                }
                paymentHandler(false);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        else
        {
            loadingHandler(true)
            axios.post(process.env.REACT_APP_URL+"deleteMyTicket",{"token":sessionStorage.getItem('ticketKey')},auth.config)
            .then((response)=>{
                if(response.data.success == true)
                {
                    sessionStorage.removeItem("ticketKey");
                    sessionStorage.removeItem("bankKey")
                    window.location.href = "/buyticket/"+hospitalId   
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
    }


    return (
        <React.Fragment>
        {
            loading == true?
            (
                <Loader/>
            ):
            payLoading == true?
            (
                <PaymentLoader/>
            ):
            (
                <div className="modal fade" id={nomenclature} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">{heading}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <Container>
                        <Row className="p-4">
                            <Col lg={6}>
                                <button className="btn btn-success btn-md w-100" style={{boxShadow:"2px 2px 6px rgba(0,0,0,0.6)"}}  type="button" name="yes" onClick={(e)=>{userDecision(e)}}> Yes </button>
                            </Col>
                            <Col lg={6}>
                                <button className="btn btn-danger btn-md w-100" style={{boxShadow:"2px 2px 6px rgba(0,0,0,0.6)"}} data-bs-dismiss="modal" type="button" name="no"> No </button>
                            </Col>
                        </Row>
                    </Container>
                </div>
                </div>
                </div>
                </div>
            )
        }
        
        </React.Fragment>
    )
}

export default PaymentModal
