import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Container,Row,Col} from 'react-bootstrap';
import {toast} from 'react-toastify'
import useLoader from '../common/useLoader'
import Loader from '../common/loader'


const EditDetails = (props) => {
    const {data} = props;
    let {loading,loadingHandler} = useLoader();
    //state goes here
    let [hospitalDetails,setData] = useState({
        "hospitalId":data._id,
        "hospitalName":data.hospitalName,
        "location":data.location,
        "mobileNumber":data.mobileNumber,
        "officeNumber":data.officeNumber,
        "emailAddress":data.emailAddress,
        "department":data.department.join(","),
        "designation":data.designation,
        "personName":data.personName,
        "latitude":data.locationPoint.coordinates[1],
        "longitude":data.locationPoint.coordinates[0],
        "description":data.description,
        "config":{
            "headers":{
                "authorization":`Bearer ${sessionStorage.getItem('token')}`
            }
        },
        "errors":{}
    })


    //handlers goes here
    const changeHandler = (e)=>{
        let {name,value} = e.target;
        setData({
            ...hospitalDetails,
            [name]:value
        })
    }

    const editDetails = (e)=>{
        e.preventDefault();
        loadingHandler(true)
        axios.post(process.env.REACT_APP_URL+"editHospitalDetails",hospitalDetails,hospitalDetails.config)
        .then((response)=>{
            if(response.data.success == true) {
                toast.success(response.data.message)
                window.location.reload();
            }
            else
            {
                setData({
                    ...hospitalDetails,
                    ['errors']:response.data.error
                })
            }
            loadingHandler(false)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <React.Fragment>
            {
				loading == true&&
				(
					<Loader/>
				)
			}
            <Container fluid>
                <Row>
                    <Col>
                        <h5 style={{fontWeight:"bolder",color:"#0f6c81",fontSize:"20px",margin:"5px"}}> Edit Details OF {data.hospitalName} </h5>
                        <form method = "post" className="reg__form2" onSubmit={editDetails}>                               
                                    <Row className='p-2'>
                                        <Col lg={6} md={12} xs={12}>                                                                           
                                                <div className="form-group">
                                                    <label> Hospital Name</label>
                                                    <input type="text" className="form-control" value={hospitalDetails.hospitalName} onChange={(event)=>{changeHandler(event)}} name="hospitalName" placeholder="Enter hospital name"/>
                                                    {hospitalDetails['errors']['hospitalName']&& (<p> <small style={{color:"red"}}> *{hospitalDetails['errors']['hospitalName']} </small> </p>)}
                                                </div>
                                        </Col>
                                        <Col lg={6} md={12} xs={12}>                                                                
                                        <div className="form-group">
                                            <label> Email Address</label>
                                            <input type="email" className="form-control" value={hospitalDetails.emailAddress} onChange={(event)=>{changeHandler(event)}} name="emailAddress" placeholder="Enter email address" />
                                            {hospitalDetails['errors']['emailAddress']&& (<p> <small style={{color:"red"}}> *{hospitalDetails['errors']['emailAddress']} </small> </p>)}
                                        </div>
                                        </Col>
                                    </Row>
                                    
                                    <Row className='p-2'>
                                        <Col lg={6} md={12} xs={12}>                                                                           
                                                <div className="form-group">
                                                    <label> Mobile Number</label>
                                                    <input type="text" maxLength="10" className="form-control" value={hospitalDetails.mobileNumber} onChange={(event)=>{changeHandler(event)}} name="mobileNumber" placeholder="Enter mobile number" />
                                                    {hospitalDetails['errors']['mobileNumber']&& (<p> <small style={{color:"red"}}> *{hospitalDetails['errors']['mobileNumber']} </small> </p>)}
                                                </div>
                                        </Col>
                                        <Col lg={6} md={12} xs={12}>                                                                
                                                <div className="form-group">
                                                    <label> Office Number</label>
                                                    <input type="text" className="form-control" name="officeNumber" value={hospitalDetails.officeNumber} onChange={(event)=>{changeHandler(event)}} placeholder="Enter office number" />
                                                    {hospitalDetails['errors']['officeNumber']&& (<p> <small style={{color:"red"}}> *{hospitalDetails['errors']['officeNumber']} </small> </p>)}
                                                </div>
                                        </Col>
                                    </Row>

                                    <div className="form-group p-2">
                                            <label> Department</label>
                                            <input type="text" className="form-control" name="department" value={hospitalDetails.department} onChange={(event)=>{changeHandler(event)}} placeholder="Enter departments" />
                                            <small style={{color:"grey"}}> *Separate each departments with comma </small>
                                            {hospitalDetails['errors']['department']&& (<p> <small style={{color:"red"}}> *{hospitalDetails['errors']['department']} </small> </p>)}
                                    </div>

                                    <Row className='p-2'>
                                        <Col lg={6} md={12} xs={12}>                                                                           
                                                <div className="form-group">
                                                    <label> Contact Person Name</label>
                                                    <input type="text" className="form-control" name="personName" value={hospitalDetails.personName} onChange={(event)=>{changeHandler(event)}} placeholder="Enter contact person name" />
                                                    {hospitalDetails['errors']['personName']&& (<p> <small style={{color:"red"}}> *{hospitalDetails['errors']['personName']} </small> </p>)}
                                                </div>
                                        </Col>
                                        <Col lg={6} md={12} xs={12}>                                                                
                                                <div className="form-group">
                                                    <label> Designation</label>
                                                    <input type="text" className="form-control" name="designation" value={hospitalDetails.designation} onChange={(event)=>{changeHandler(event)}} placeholder="Enter designation" />
                                                    {hospitalDetails['errors']['designation']&& (<p> <small style={{color:"red"}}> *{hospitalDetails['errors']['designation']} </small> </p>)}
                                                </div>
                                        </Col>
                                    </Row>
                                    <Row className='p-2'>
                                        
                                        <Col lg={6} md={12} xs={12}>                                                                
                                        <div className="form-group">
                                            <label> Hospital Address</label>
                                            <input type="text" className="form-control" name="location" value={hospitalDetails.location} onChange={(event)=>{changeHandler(event)}} placeholder="Enter location of hospital"  />
                                            {hospitalDetails['errors']['location']&& (<p> <small style={{color:"red"}}> *{hospitalDetails['errors']['location']} </small> </p>)}
                                        </div>
                                        </Col>
                                    </Row>
                                    
                                    <Row className='p-2'>
                                        <Col lg={6} md={12} xs={12}>                                                                           
                                                <div className="form-group">
                                                    <label> Latitude</label>
                                                    <input type="number" className="form-control" name="latitude" value={hospitalDetails.latitude} onChange={(event)=>{changeHandler(event)}} placeholder="Enter latitude" />
                                                    {hospitalDetails['errors']['latitude']&& (<p> <small style={{color:"red"}}> *{hospitalDetails['errors']['latitude']} </small> </p>)}
                                                </div>
                                        </Col>
                                        <Col lg={6} md={12} xs={12}>                                                                
                                                <div className="form-group">
                                                    <label> Longitude</label>
                                                    <input type="number" className="form-control" name="longitude" value={hospitalDetails.longitude} onChange={(event)=>{changeHandler(event)}} placeholder="Enter longitude" />
                                                    {hospitalDetails['errors']['longitude']&& (<p> <small style={{color:"red"}}> *{hospitalDetails['errors']['longitude']} </small> </p>)}
                                                </div>
                                        </Col>
                                    </Row>
                                    <Row className='p-2'>
                                        <Col lg={12} md={12} xs={12}>                                                                           
                                                <div className="form-group">
                                                    <label> Description</label>
                                                    <textarea className="form-control" name="description" onChange={(event)=>{changeHandler(event)}} placeholder="Enter description">{hospitalDetails.description}</textarea>
                                                    {hospitalDetails['errors']['description']&& (<p> <small style={{color:"red"}}> *{hospitalDetails['errors']['description']} </small> </p>)}
                                                </div>
                                        </Col>
                                        
                                    </Row>
                                    {hospitalDetails['errors']['random']&& (<p> <small style={{color:"red"}}> *{hospitalDetails['errors']['random']} </small> </p>)}

                                    
                                
                                    <div className="text-center">
                                        <button className="btn btn-md w-25 mt-3 btn__Add" name="hospital" type="submit" style={{boxShadow:"3px 3px 4px rgba(0,0,0,0.6)"}}> Edit Details </button>
                                    </div>
                                </form>
                        <button type="button" style={{float:"right"}}  className="btn btn-danger w-0 btn-md" data-bs-dismiss="modal">Close</button>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default EditDetails
