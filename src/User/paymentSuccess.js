import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Container,Row,Col,Table} from 'react-bootstrap'
import {BiTask} from 'react-icons/bi'
import {CSVLink} from 'react-csv';
import {FaDownload} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import useLoader from '../common/useLoader'
import Skeleton from '../common/Skeleton'


const PaymentSuccess = (props) => {
    const {} = props;
    let {skeletonLoading,skeletonHandler} = useLoader();
    //state goes here
    let [ticketDetail,setTicketDetail] = useState({});
    let [ticketCsv,setTicket] = useState([]);
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${sessionStorage.getItem('token')}`
            }
        }
    })

    //effect goes here
    useEffect(()=>{
        if(sessionStorage.getItem('ticketKey'))
        {
            skeletonHandler(true)
            axios.post(process.env.REACT_APP_URL+"generateCsv",{"token":sessionStorage.getItem('ticketKey')},auth.config)
            .then((response)=>{
                if(response.data.success == true)
                {
                    setTicketDetail(
                        response.data.ticket
                    )
    
                    setTicket(
                        response.data.data
                    )
                }
                else
                {
                    setTicketDetail({});
                    setTicket([]);
                }
                skeletonHandler(false)
                sessionStorage.removeItem('ticketKey')
            })
            .catch((err)=>{
                console.log(err);
                
            })
        }
        else
        {
            window.location.href="/hospitals"
        }
    },[])

    var headers = [];
    if(ticketCsv.length > 0)
    {
        let dataBox = ticketCsv[0];
        for(var i in dataBox)
        {
            headers.push({"label":i,"key":i})
        }
    }
   
    const csvReport = {
        filename:`tickets${Date.now()}.csv`,
        headers:headers,
        data:ticketCsv
    }

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                    <Col lg={8}>
                        <div className="payment__success m-4">
                            <p className="text-center"> <BiTask style={{fontSize:"65px",color:"green"}}/> </p>
                            <p className="text-center mb-0" style={{fontWeight:"bold",color:"black"}}> Payment Successful!  </p>
                            <p className="text-center" style={{color:"black"}}> <small>Thank you for your payment. Please verify your details.</small>  </p>
                            <Row>

                                <Col lg={1} className="d-none d-md-none d-lg-block"></Col>
                                <Col lg={10}>
        
                                {
                                    skeletonLoading == true?
                                    (
                                        <Skeleton/>
                                    ):
                                    (
                                        <Table hover className="m-3 w-100">
                                            <thead>
                                            <tr>
                                                <td>Hospital Name</td>
                                                <th style={{color:"black",textAlign:"right",fontWeight:"600"}}> {ticketDetail['Hospital Name']} </th>
                                            </tr>

                               

                                            <tr>
                                                <td>Patient Name</td>
                                                <th style={{color:"black",textAlign:"right",fontWeight:"600"}}> {ticketDetail['Patient Name']} </th>
                                            </tr>
                                            <tr>
                                                <td>Age</td>
                                                <th style={{color:"black",textAlign:"right",fontWeight:"600"}}> {ticketDetail['Age']} </th>
                                            </tr>
                                            <tr>
                                                <td>Gender</td>
                                                <th style={{color:"black",textAlign:"right",fontWeight:"600"}}> {ticketDetail['Gender']} </th>
                                            </tr>
                                            <tr>
                                                <td>Shift</td>
                                                <th style={{color:"black",textAlign:"right",fontWeight:"600"}}> {ticketDetail['Shift']} </th>
                                            </tr>
                                            <tr>
                                                <td>Date</td>
                                                <th style={{color:"black",textAlign:"right",fontWeight:"600"}}> {ticketDetail['Date']} </th>
                                            </tr>
                                            <tr>
                                                <td>Time</td>
                                                <th style={{color:"black",textAlign:"right",fontWeight:"600"}}> {ticketDetail['Time']} </th>
                                            </tr>
                                            <tr>
                                                <td> Department </td>
                                                <th style={{color:"black",textAlign:"right",fontWeight:"600"}}> {ticketDetail['Department']} </th>
                                            </tr>
                                            <tr>
                                                <td> Ticket Number </td>
                                                <th style={{color:"black",textAlign:"right",fontWeight:"600"}}> {ticketDetail['Ticket Number']} </th>
                                            </tr>
                                            <tr>
                                                <td> Price </td>
                                                <th style={{color:"black",textAlign:"right",fontWeight:"600"}}> {ticketDetail['Price']} </th>
                                            </tr>
                                            <tr>
                                                <td> Bought For </td>
                                                <th style={{color:"black",textAlign:"right",fontWeight:"600"}}> {ticketDetail['Bought For']} </th>
                                            </tr>
                                            
                                        
                                            </thead>
                                        </Table>
                                    )
                                }
                              
                                </Col>
                                <Col lg={1} className="d-none d-md-none d-lg-block"></Col>
                                <Col lg={5} className="d-none d-md-none d-lg-block"></Col>
                                <Col lg={3}>
                                    <CSVLink {...csvReport} style={{textDecoration:"none",color:"black",textAlign:"center",marginTop:"6px",border:"1px solid grey",padding:"6px"}}> <small>Download CSV <FaDownload/></small> </CSVLink>
                                </Col>
                                <Col lg={3} className="d-none d-md-none d-lg-block"></Col>
                                <Link to="/myTickets" style={{color:"black",textAlign:"center",marginTop:"10px"}}> Go To My Tickets </Link>
                            </Row>


                        </div>
                    </Col>
                    <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default PaymentSuccess
