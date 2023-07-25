import React,{useState,useEffect} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
 
import Delete from './delete'

import axios from 'axios';
import {toast} from 'react-toastify';
import useLoader from '../common/useLoader'
import Loader from '../common/loader'


const EditTicket = (props) => {
    let{data} = props;
	let {loading,loadingHandler} = useLoader();

	//state goes here
	let [ticketDetails,setDetails] = useState({
		"ticketId":data._id,
		"shift":data.shift,
		"startTime":data.startTime2,
		"endTime":data.endTime2,
		"day":data.day,
		"date":data.date,
		"ticketCount":data.ticketCount,
		"price":data.price,
		"errors":{},
		"config":{
			"headers":{
				"authorization":`Bearer ${sessionStorage.getItem('token')}`
			}
		}
	});

	//handler goes here
	const changeHandler = (e)=>{
		const {name,value} = e.target;
		setDetails({
			...ticketDetails,
			[name]:value
		})
	}

	const updateTicket = (e)=>{
		e.preventDefault();
		loadingHandler(true);

		axios.post(process.env.REACT_APP_URL+"updateIssuedTickets",ticketDetails,ticketDetails.config)
		.then((response)=>{
			if(response.data.success == true)
			{
				toast.success(response.data.message);
				window.location.reload();
			}
			else
			{
				// toast.error(response.data.message);
				setDetails({
					...ticketDetails,
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
			<div class="modal fade" id={`editTicket${data._id}`} tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-xl">
				<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel" style={{color:"#053742",fontSize:"25px",fontWeight:"bold"}}>Update Ticket</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
				<form method="post" className="reg__form2" onSubmit={updateTicket}>
								<Row>
									<Col lg={4} md={12} xs={12}>
										<div className="form-row ticket">
											<div className="form-group ">
												<label> Shift</label>									
												<input type="text" className="form-control" name="shift" value={ticketDetails.shift} readOnly/>
											</div>
											
										</div>
									</Col>

									<Col lg={4} md={12} xs={12}>
										<div className="form-row ticket">
											<div className="form-group">
												<label> Allocate Ticket</label>		
												<input className="form-control" type="number" name="ticketCount" min="1" value={ticketDetails.ticketCount} onChange={(event)=>{changeHandler(event)}}/>
												{ticketDetails['errors']['ticketCount']&& (<p> <small style={{color:"red"}}> *{ticketDetails['errors']['ticketCount']} </small> </p>)}
											</div>
										</div>
									</Col>

									<Col lg={4} md={12} xs={12}>
										<div className="form-row ticket">
											<div className="form-group">
												<label>Ticket Price</label>	
												<input className="form-control" type="number" name="price" value={ticketDetails.price} onChange={(event)=>{changeHandler(event)}}/>
												{ticketDetails['errors']['price']&& (<p> <small style={{color:"red"}}> *{ticketDetails['errors']['price']} </small> </p>)}
											</div>
										</div>
									</Col>
								</Row>
								<Row>
									<Col lg={6} md={12} xs={12}>
										<div className="form-row ticket">
											<div className="form-group">
												<label>Date</label>
												<input className="form-control" type="date" name="date" value={ticketDetails.date} readOnly/>
												
											</div>
										</div>
									</Col>
									<Col lg={6} md={12} xs={12}>
										<div className="form-row ticket">
											<div className="form-group">
												<label>Day</label>	
												<input className="form-control" type="text" name="day" value={ticketDetails.day} readOnly/>
												
											</div>
										</div>
									</Col>
								</Row>


                    
			
								<Row>
									<Col lg={6} md={12} xs={12}>
										<div className="form-row ticket">
											<div className="form-group">
												<label>Start Time</label>
												<input className="form-control" type="time" name="startTime" value={ticketDetails.startTime} onChange={(event)=>{changeHandler(event)}}/>
												{ticketDetails['errors']['startTime']&& (<p> <small style={{color:"red"}}> *{ticketDetails['errors']['startTime']} </small> </p>)}
											</div>
										</div>
									</Col>
									<Col lg={6} md={12} xs={12}>
										<div className="form-row ticket">
											<div className="form-group ">
												<label>End Time</label>	
												<input className="form-control" type="time" name="endTime" value={ticketDetails.endTime} onChange={(event)=>{changeHandler(event)}}/>
												{ticketDetails['errors']['endTime']&& (<p> <small style={{color:"red"}}> *{ticketDetails['errors']['endTime']} </small> </p>)}
											</div>
										</div>
									</Col>
								</Row>
								{ticketDetails['errors']['random']&& (<p className="text-center"> <small style={{color:"red"}}> *{ticketDetails['errors']['random']} </small> </p>)}
								<Row>
                        <Col lg={6} md={12} xs={12}>
                            <div className="form-row ticket">
                                <div className="form-group">
                                <button type="button" className="btn mt-3 mb-4 btn-danger" data-bs-toggle="modal" data-bs-target={`#deleteTicket${data._id}`} style={{ boxShadow: '4px 3px 8px #424242',padding: '7px 50px',float: 'right'}} name="issueTicket">Delete</button>
								<Delete ticketId={data._id} key={`delete${data._id}`}/>
                                    
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} md={12} xs={12}>
                            <div className="form-row ticket">
                                <div className="form-group ">
                                <button type="submit" className="btn mt-3 mb-4 btn__Add" style={{ boxShadow: '4px 3px 8px #424242',padding: '7px 50px',float: 'left'}} name="issueTicket">Update</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
							</form>
				</div>
				
				</div>
			</div>
			</div>

        </React.Fragment>
    )
}

export default EditTicket
