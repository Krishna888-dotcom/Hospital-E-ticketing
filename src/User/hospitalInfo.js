import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Table} from 'react-bootstrap';
import { withRouter } from 'react-router';
import useHospitals from './useHospital'


const HospitalInfo = (props) => {
    const {} = props;
    const {hospital,shifts,shiftError} = useHospitals(props.match.params.hospitalId)
  
    if(shiftError != "")
    {
        window.location.href = "/hospitals"
    }

    return (
        <React.Fragment>
            {
                hospital &&
                (
                    <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <div className="main__bg">
                                <Row>
                                    <Col lg={1} className="d-none d-md-none d-lg-block"></Col>
                                    <Col lg={10} md={12} xs={12} className="d-none d-md-none d-lg-block">
                                        <div className="hospital__img">
                                            <img src={`${process.env.REACT_APP_URL}${hospital.hospitalImage}`} className="d-block" alt="hospital"/>
                                        </div>
                                    </Col>
                                    <Col lg={1} className="d-none d-md-none d-lg-block"></Col>
                                    <Col lg={1} className="d-none d-md-none d-lg-block"></Col>
                                    <Col lg={10} md={12} xs={12}>
                                        <div className="hospital__detail mt-4 p-3">
                                            <h5 style={{fontWeight:"bolder",color:"#4b1cac",textAlign:"center"}}> {hospital.hospitalName} </h5>  
                                            <div>
                                                <p className="mb-1" style={{float:"right"}}> {hospital.location} </p>
                                                <p className="mb-1"> <span> {hospital.emailAddress} </span> </p>
                                            </div>
                                            <div>
                                                <p className="mb-1" style={{float:"right"}}> {hospital.officeNumber} </p>
                                                <p className="mb-1"> <span> {hospital.mobileNumber} </span> </p>
                                            </div>
                                            
                                            
                                        </div>
                                    </Col>
                                    <Col lg={1} className="d-none d-md-none d-lg-block"></Col>


                                    <Col lg={1} className="d-none d-md-none d-lg-block"></Col>
                                    <Col lg={10} md={12} xs={12}>
                                    <h5 style={{fontWeight:"bolder",color:"#4b1cac",textAlign:"center"}}> Ticket Availability </h5>  
                                       <Table className="table table-hover table-bordered myTable">
                                           <thead>
                                               <tr>
                                                   <th> Morning </th>
                                                   <td style={{textAlign:"right"}}> 
                                                    {
                                                        shifts["Morning"]&&(
                                                            shifts["Morning"][5] == "Available"?
                                                            (
                                                                <> Available</>
                                                            ):
                                                            (
                                                                <> Unavailable </>
                                                            )
                                                        )
                                                    }
                                                   
                                                   
                                                    </td>
                                               </tr>
                                               <tr>
                                                   <th> Afternoon </th>
                                                   <td style={{textAlign:"right"}}>
                                                   {
                                                        shifts["Afternoon"]&&(
                                                            shifts["Afternoon"][5] == "Available"?
                                                            (
                                                                <> Available</>
                                                            ):
                                                            (
                                                                <> Unavailable </>
                                                            )
                                                        )
                                                    }
                                                   </td>
                                               </tr>
                                               <tr>
                                                   <th> Evening </th>
                                                   <td style={{textAlign:"right"}}> 
                                                    {
                                                        shifts["Evening"]&&(
                                                            shifts["Evening"][5] == "Available"?
                                                            (
                                                                <> Available</>
                                                            ):
                                                            (
                                                                <> Unavailable </>
                                                            )
                                                        )
                                                    }
                                                   </td>
                                               </tr>
                                           </thead>
                                       </Table>
                                    </Col>
                                    <Col lg={1} className="d-none d-md-none d-lg-block"></Col>

                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
                )
            }
           
        </React.Fragment>
    )
}

export default withRouter(HospitalInfo)
