import React,{useState,useEffect} from 'react'
import useHospitals from './useHospital'
import { withRouter } from 'react-router';
import {Row,Col,Container,Table} from 'react-bootstrap'
import {useToasts} from 'react-toast-notifications'
import axios from 'axios'
import ProgressButton from '../common/progressButton'
import useLoader from '../common/useLoader'

const Other = (props) => {
    let{}=props
    let [selectedShift,setSelected] = useState("Shift");
    let {loading,loadingHandler} = useLoader();
    let hospitalId = props.match.params.hospitalId;
    let {hospital,shifts} = useHospitals(hospitalId);
    let {addToast} = useToasts();

    //state goes here
    let [buyTicketDetails,setDetails] = useState({
        "patientName":"",
        "age":"",
        "department":"",
        "shift":"",
        "address":"",
        "gender":"",
        "hospitalId":hospitalId,
        "boughtFor":"Others",
        "config":{
            "headers":{
                "authorization":`Bearer ${sessionStorage.getItem('token')}`
            }
        },
        "errors":{}
    });

     //effect goes here
     useEffect(() => {
        if (buyTicketDetails.gender == "Male") {
            document.querySelector('#Male').checked = true;
        }
        else if (buyTicketDetails.gender == "Female") {
            document.querySelector('#Female').checked = true;
        }
        if (buyTicketDetails.gender == "Other") {
            document.querySelector('#Other').checked = true;
        }
    }, [buyTicketDetails.gender])

    const changeShift = (e)=>{
        setSelected(
            e.target.value
        )
    }

    const changeHandler = (e)=>{
        let {name,value} = e.target;
        setDetails({
            ...buyTicketDetails,
            [name]:value
        })
    }

    const unavailableMessage = (e)=>{
        if(selectedShift == "Shift")
        {
            addToast("You have not selected a shift.",{
                "autoDismiss":true,
                "appearance":"warning"
            })
        }
        else
        {
            let shiftValues = Object.values(shifts);
            let shiftKeys = Object.keys(shifts);
            let shiftAvailable = ""
            let ticketValue = shiftValues.map((val)=>{return val[0] != "N/A"});
            for(var i=0; i<ticketValue.length; i++)
            {
                if(ticketValue[i] == true)
                {
                    shiftAvailable+=`${shiftKeys[i]},`
                }
            }
            shiftAvailable = shiftAvailable.slice(0,shiftAvailable.length-1);
            addToast(`Tickets are available for ${shiftAvailable} shift(s) only.`,{
                "autoDismiss":true,
                "appearance":"warning"
            })
        }
    }

    

    const reserveTicket = (e)=>{
        e.preventDefault();
        loadingHandler(true);

        axios.post(process.env.REACT_APP_URL+"buyTicket",buyTicketDetails,buyTicketDetails.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                addToast(response.data.message,{
                    "appearance":"success",
                    "autoDismiss":true
                })
                sessionStorage.setItem('ticketKey',response.data.token)
                window.location.href = "/ticketdetail/"+hospitalId

            }
            else
            {
                addToast(response.data.message,{
                    "appearance":"error",
                    "autoDismiss":true
                })

                setDetails({
                    ...buyTicketDetails,
                    ["errors"]:response.data.error,
                    ['gender']:""
                })
            }
            loadingHandler(false);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

   

    return (
        <React.Fragment>
            <div className="container w-4">
                <form className="self reg__form2" method="post" onSubmit={reserveTicket}>
                <div className="from-row m-3">
                    <div className="from-group">
                            <Row>
                                <Col lg={4}>
                                    <label>Shift</label>
                                </Col>
                                <Col lg={8}>
                                <select  className="form-select" name="shift" onChange={(e)=>{changeShift(e); changeHandler(e);}} required>
                                    <option value="Shift">Select Shift</option>
                                    <option value="Morning">Morning</option>
                                    <option value="Afternoon">Afternoon</option>
                                    <option value="Evening">Evening</option>
                                </select>
                                </Col>
                            
                            </Row>
                            {buyTicketDetails['errors']['shift']&& (<p>  <small style={{color:"red"}}> *{buyTicketDetails['errors']['shift']}</small></p>)}    
                        </div>
                    </div>
                    <div className="form-row m-3">           
                    <div className="form-group">
                    <Row>
                               <Col lg={4}>    
                                <label>Department</label>
                                </Col> 
                                <Col lg={8}>
                                <select className="form-select" onChange={(e)=>{changeHandler(e)}} name="department">
                                    <option value="">Select Department</option>
                                    {
                                        hospital.department&&
                                        (
                                            hospital.department.map((val)=>{
                                                return (
                                                    <option value={val}> {val} </option>
                                                )
                                            })
                                        )
                                    }
                                </select>
                                             
                                </Col>
                                </Row>  
                                {buyTicketDetails['errors']['department']&& (<p>  <small style={{color:"red"}}> *{buyTicketDetails['errors']['department']}</small></p>)}                    
                        </div>
                        </div> 
                    <div className="form-row m-3">
                    <div className="from-group">
                            <Row>
                                <Col lg={4}>
                                    <label>Patient Name</label>
                                </Col>
                                <Col lg={8}>
                                    <input type="text" className="form-control" name="patientName" value={buyTicketDetails.patientName} onChange={(e)=>{changeHandler(e)}} required/>
                                
                                </Col>
                            
                            </Row>
                            {buyTicketDetails['errors']['patientName']&& (<p>  <small style={{color:"red"}}> *{buyTicketDetails['errors']['patientName']}</small></p>)}
                        </div>
                    </div>
                    <div className="form-row m-3">
                    <div className="from-group">
                            <Row>
                                <Col lg={4}>
                                    <label>Age</label>
                                </Col>
                                <Col lg={8}>
                                <input type="number" min="1" className="form-control" name="age" value={buyTicketDetails.age} onChange={(e)=>{changeHandler(e)}} required />
                                </Col>
                            
                            </Row>
                            {buyTicketDetails['errors']['age']&& (<p>  <small style={{color:"red"}}> *{buyTicketDetails['errors']['age']}</small></p>)}
                        </div>
                    </div>
                    <div className="form-row m-3">
                        <div className="from-group">
                            
                            <Row>
                                <Col lg={4}>
                                <label>Address</label>
                                </Col>
                                <Col lg={8}>
                                <input type="text" name="address" className="form-control" value={buyTicketDetails.address} onChange={(event)=>{changeHandler(event)}} required/>
                                </Col>
                            </Row>
                            {buyTicketDetails['errors']['address']&& (<p>  <small style={{color:"red"}}> *{buyTicketDetails['errors']['address']}</small></p>)}
                        </div>
                    </div>
                    <div className="form-row m-3">
                        <div className="un">
                            <div className="form-group mb-2">
                            <Row>
                                <Col lg={4}>
                                <label> Select Your Gender</label>
                                {buyTicketDetails['errors']['gender']&& (<p>  <small style={{color:"red"}}> *{buyTicketDetails['errors']['gender']}</small></p>)}
                                </Col>
                                <Col lg={8}>
                                <div className="mb-2">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id="Male" value="Male" onChange={(event)=>{changeHandler(event)}}/>
                                    <label className="form-check-label" for="Male">Male</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id="Female" value="Female" onChange={(event)=>{changeHandler(event)}}/>
                                    <label className="form-check-label" for="Female">Female</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id="Other" value="Other" onChange={(event)=>{changeHandler(event)}}/>
                                    <label className="form-check-label" for="Other">Other</label>
                                </div>
                            </div>
                                </Col>
                            </Row>
                                
                                
                            </div>
                            

                        </div>
                    </div>
                   
                    
                    <Table bordered hover className="myTable m-3 w-100">
                    <thead>
                        <tr className="text-center">
                            <th>Time</th>
                            {
                                shifts[selectedShift]&&
                                (
                                    
                                    <td>{shifts[selectedShift][1]}</td>
                                    
                                    
                                )
                            }
                           
                        </tr>
                        <tr className="text-center">
                            <th>Ticket Fee</th>
                            {
                                shifts[selectedShift]&&
                                (        
                                    <td>Rs {shifts[selectedShift][0]}</td> 
                                )
                            }    
                            
                        </tr>
                        <tr className="text-center">
                            <th>Available Tickets</th>
                            {
                                shifts[selectedShift]&&
                                (        
                                    <td>{shifts[selectedShift][3]}<strong>  / </strong> {shifts[selectedShift][2]}</td> 
                                )
                            }    
                            
                        </tr>
                        </thead>
                    </Table>

                    <div className="text-center">
                            {
                                shifts[selectedShift]&&
                                (
                                    shifts[selectedShift][5] == "Available"?
                                    (
                                        loading == true?
                                        (
                                            <ProgressButton/>
                                        ):
                                        (
                                            <button type="submit" className="btn btn-md btn__Add w-25 mt-3" style={{boxShadow:"3px 4px 6px rgba(0,0,0,0.6)"}}> Proceed</button> 
                                        )
                                    ):
                                    (
                                        <button type="button" className="btn btn-danger w-25 mt-3" style={{boxShadow:"3px 4px 6px rgba(0,0,0,0.6)"}} onClick={(e)=>{unavailableMessage(e)}}> Unavailable </button>
                                    )
                                )
                                
                            }
                           
                        </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default withRouter(Other)
