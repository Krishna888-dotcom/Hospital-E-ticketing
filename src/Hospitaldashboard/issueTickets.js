import React, { useState, useEffect } from 'react';
import { Container, Row, Col,Table } from 'react-bootstrap';
import axios from 'axios';
import {useToasts} from 'react-toast-notifications'
import {SiZeromq} from 'react-icons/si'
import {FcExpired,FcProcess} from 'react-icons/fc';
import {FaHourglassEnd} from 'react-icons/fa'
import {ImCross} from 'react-icons/im'
import ReactPaginate from 'react-paginate';
import EditTicket from './editTicket'
import Loader from '../common/loader';
import Skeleton from '../common/Skeleton'
import useLoader from '../common/useLoader'


const digitizer = (n) => {
    let num = n;
    if (num < 10) {
        num = "0" + num;
    }
    return num
}

const getFormattedToday = (date) => {
    return `${date.getFullYear()}-${digitizer(date.getMonth() + 1)}-${digitizer(date.getDate())}`
}

let today = new Date();
today.setDate(today.getDate()+1);
let minDate = getFormattedToday(today);
today.setDate(today.getDate()+6);
let maxDate = getFormattedToday(today);
let todayDate = getFormattedToday(new Date());

const IssueTickets = (props) => {
	let {} = props;
	let {addToast} = useToasts();
	let {loading,loadingHandler,skeletonLoading,skeletonHandler} = useLoader();
	//state goes here
	let [ticketDetails,setDetails] = useState({
		"ticketCount":0,
		"price":0,
		"startDate":"",
		"endDate":"",
		"startTime":"",
		"endTime":"",
		"shift":"",
		"config":{
			"headers":{
				"authorization":`Bearer ${sessionStorage.getItem('token')}`
			}
		},
		"errors":{}
	})

	let [tickets,setTickets] = useState([]);
	let [currentPage,setCurrentPage] = useState(0);
	let [shift,setShift] = useState("");
	let [shiftTicket,setShiftTicket] = useState({});

	let singlePage = 7;
	let pageVisited = currentPage * singlePage;
	//effect goes here
	useEffect(()=>{
		skeletonHandler(true)
		axios.get(process.env.REACT_APP_URL+"ticketsIssued",ticketDetails.config)
		.then((response)=>{
			console.log(response)
			if(response.data.success == true)
			{
				setTickets(response.data.data);
			}
			else
			{
				setTickets([]);
			}
			
			skeletonHandler(false);
			
			
		})
		.catch((err)=>{
			console.log(err);
		})
	},[])

	useEffect(()=>{
		axios.get(process.env.REACT_APP_URL+"ticketPrediction",ticketDetails.config)
		.then((response)=>{	
			if(response.data.success == true)
			{
				setShiftTicket(
					response.data.data
				)
			}
			else
			{
				setShiftTicket(
					{}
				)
			}
		})
		.catch((err)=>{
			console.log(err);
		})
	},[]);


	//handler goes here
	const changeHandler = (e)=>{
		const {name,value} = e.target;
		setDetails({
			...ticketDetails,
			[name]:value
		})
	}

	const dateFormatter = (e)=>{
		let endDate = document.querySelector('#endDate');
		let startDate = new Date(e.target.value);
		let minDate = getFormattedToday(startDate);
		startDate.setDate(startDate.getDate()+7);
		let maxDate = getFormattedToday(startDate);
		endDate.setAttribute('min',minDate);
		endDate.setAttribute('max',maxDate);
		endDate.value = "";
		ticketDetails['endDate'] = "";
		endDate.disabled = false;
	}

	const issueTicket = (e)=>{
		e.preventDefault();	
		loadingHandler(true);
		axios.post(process.env.REACT_APP_URL+"issueTickets",ticketDetails,ticketDetails.config)
		.then((response)=>{
			if(response.data.success == true)
			{
				addToast(response.data.message,{
					"appearance":"success",
					"autoDismiss":true
				})
				window.location.reload();
			}
			else
			{
				setDetails({
					...ticketDetails,
					["errors"]:response.data.error
				})
			}
			loadingHandler(false);
		})
		.catch((err)=>{
			console.log(err);
		})
	}


	const loadContent = (data)=>{
		if(data.ticketStatus == "Pending")
		{
			return 	(
				<>
					<td><FaHourglassEnd/></td>
					<td>
						<button type="button" className="btn btn-success btn-md w-0" data-bs-toggle="modal" data-bs-target={`#editTicket${data._id}`} name="edit" style={{boxShadow:"2px 3px 4px rgba(0,0,0,0.6)"}}>  <i className="fas fa-pen"></i> </button>
						
					</td>
				</>
			)
		}
		else if(data.ticketStatus == "Out of Stock")
		{
			return 	(
				<>
					<td><SiZeromq style={{fontSize:"21px",fontWeight:"bolder"}}/></td>
					<td>
						<button type="button" className="btn btn-danger btn-md w-0" name="edit" style={{boxShadow:"2px 3px 4px rgba(0,0,0,0.6)"}}>  <ImCross/> </button>
					</td>
				</>
			)
		}
		else if(data.ticketStatus == "On Count")
		{
			return 	(
				<>
					<td><FcProcess style={{fontSize:"21px",fontWeight:"bolder"}}/></td>
					<td>
						
						{
							data.date > todayDate ?
							(
								<button type="button" className="btn btn-success btn-md w-0" data-bs-toggle="modal" data-bs-target={`#editTicket${data._id}`} name="edit" style={{boxShadow:"2px 3px 4px rgba(0,0,0,0.6)"}}>  <i className="fas fa-pen"></i> </button>
							):
							(
								<button type="button" className="btn btn-danger btn-md w-0" name="edit" style={{boxShadow:"2px 3px 4px rgba(0,0,0,0.6)"}}>  <ImCross/> </button>
							)
						}
					</td>
				</>
			)
		}
		else if(data.ticketStatus == "Expired")
		{
			return 	(
				<>
					<td><FcExpired style={{fontSize:"21px",fontWeight:"bolder"}}/></td>
					<td>
						<button type="button" className="btn btn-danger btn-md w-0" name="edit" style={{boxShadow:"2px 3px 4px rgba(0,0,0,0.6)"}}>  <ImCross/> </button>
					</td>
				</>
			)
		}
	}

	const changePage = ({selected})=>{
		setCurrentPage(
			selected
		)
	}

	const makeInt = (e)=>{
		
		e.target.value = parseInt(e.target.value)
		
	}

	let pages = Math.ceil(tickets.length/singlePage);
	let contents = tickets.slice(pageVisited,pageVisited+singlePage);

	return (
		<React.Fragment>
			{
				loading == true&&
				(
					<Loader/>
				)
			}
			<div className="container">
				<h1 className="font-weight-bold mb-2 pb-3 red" style={{color:"grey",fontWeight:"bold"}}>Issue Tickets</h1>
				{
					shiftTicket&&
					(
						shiftTicket[shift]&&
						(
							
							<p className="mb-1"> <small style={{marginLeft:"16px",color:"grey"}}> <strong> Prediction on Allocate Tickets: </strong>  Min- {shiftTicket[shift][1]}||Max- {shiftTicket[shift][0]}</small> </p>
						)
					)
				}
				<form method="post" className="reg__form2" onSubmit={issueTicket}>
					<Row>
						<Col lg={4} md={12} xs={12}>
							<div className="form-row ticket">
								<div className="form-group ">
									<label> Choose Shift</label>									
									<select  className="form-select" name="shift" onChange={(event)=>{changeHandler(event);setShift(event.target.value);}}>
									    <option value=""> Choose shift </option>
                                        <option value="Morning">Morning</option>
                                        <option value="Afternoon">Afternoon</option>
                                        <option value="Evening">Evening</option>
                                    </select>
								</div>
								{ticketDetails['errors']['shift']&& (<p> <small style={{color:"red"}}> *{ticketDetails['errors']['shift']} </small>  </p>)}
							</div>
						</Col>

						<Col lg={4} md={12} xs={12}>
							<div className="form-row ticket">
								<div className="form-group">
									<label> Allocate Ticket</label>		
									<input className="form-control" type="number" name="ticketCount" value={ticketDetails.ticketCount} onChange={(event)=>{ makeInt(event);changeHandler(event);}}/>
									{ticketDetails['errors']['ticketCount']&& (<p> <small style={{color:"red"}}> *{ticketDetails['errors']['ticketCount']} </small>  </p>)}
								</div>
							</div>
						</Col>

						<Col lg={4} md={12} xs={12}>
							<div className="form-row ticket">
								<div className="form-group">
									<label>Ticket Price</label>	
									<input className="form-control" type="number" name="price" value={ticketDetails.price} onChange={(event)=>{makeInt(event);changeHandler(event);}}/>
									{ticketDetails['errors']['price']&& (<p> <small style={{color:"red"}}> *{ticketDetails['errors']['price']} </small>  </p>)}
								</div>
							</div>
						</Col>
					</Row>
					<Row>
						<Col lg={6} md={12} xs={12}>
							<div className="form-row ticket">
								<div className="form-group">
									<label>Start Date</label>
									<input className="form-control" type="date" name="startDate" min={minDate} max={maxDate} value={ticketDetails.startDate} onChange={(event)=>{changeHandler(event); dateFormatter(event)}} required/>
									{ticketDetails['errors']['startDate']&& (<p> <small style={{color:"red"}}> *{ticketDetails['errors']['startDate']} </small>  </p>)}
								</div>
							</div>
						</Col>
						<Col lg={6} md={12} xs={12}>
							<div className="form-row ticket">
								<div className="form-group">
									<label>End Date</label>	
									<input className="form-control" type="date" id="endDate" name="endDate" onChange={(event)=>{changeHandler(event)}} required disabled/>
									{ticketDetails['errors']['endDate']&& (<p> <small style={{color:"red"}}> *{ticketDetails['errors']['endDate']} </small>  </p>)}
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
									{ticketDetails['errors']['startTime']&& (<p> <small style={{color:"red"}}> *{ticketDetails['errors']['startTime']} </small>  </p>)}
								</div>
							</div>
						</Col>
						<Col lg={6} md={12} xs={12}>
							<div className="form-row ticket">
								<div className="form-group ">
									<label>End Time</label>	
									<input className="form-control" type="time" name="endTime" value={ticketDetails.endTime} onChange={(event)=>{changeHandler(event)}}/>
									{ticketDetails['errors']['endTime']&& (<p> <small style={{color:"red"}}> *{ticketDetails['errors']['endTime']} </small>  </p>)}
								</div>
							</div>
						</Col>
					</Row>
					{ticketDetails['errors']['random']&& (<p className="text-center"> <small style={{color:"red"}}> *{ticketDetails['errors']['random']} </small>  </p>)}

					<div className="text-center">
						<button type="submit" className="btn btn-lg mt-3 mb-4 btn__Add" style={{ boxShadow: '4px 3px 8px #424242',padding: '7px 120px' }} name="issueTicket">Add</button>
					</div>
				</form>
				
				{
					skeletonLoading == true?
					(
						<Skeleton
								width={300}
								height={140}
						/>
					):
					(
						<Row>
					
				
						<Col lg={12} md={12} xs={12}>
						   {
							   contents.length > 0?
							   (
									<>
									<p style={{float:"right"}}> <small style={{fontWeight:"bolder"}}> {tickets.length} tickets issued. </small> </p>
									<div style={{clear:"both"}}>
									<Table bordered hover responsive className="table__items w-100"> 
										<thead>
											<tr className="text-center">
												<th> S.N </th>
												<th>Date</th>
												<th> Day </th>
												<th> Shift </th>
												<th>Time</th> 
												<th>Tickets</th>
												<th> Price </th>
												<th> Sold/Hold </th>	
												<th>Status</th>
												<th>Edit</th>
												
											</tr>
										</thead>
										{
											
											
												<tbody>
												{
													contents.map((val)=>{
														return (
															<>
															<tr className="text-center">
																<td style={{fontWeight:"bold"}}> {tickets.indexOf(val)+1} </td>
																<td> {val.date2} </td>
																<td> {val.day} </td>
																<td> {val.shift} </td>
																<td> {val.startTime}-{val.endTime} </td> 
																<td> {val.ticketCount} </td>
																<td> Rs {val.price} </td>
																<td> {val.ticketCount - val.availableTickets}  </td>
																
																{
																	loadContent(val)
																}
																
															</tr>
															{
																
																val.date > todayDate&&
																(
																	<EditTicket data={val} key={`edit${val._id}`}/>
																)
															}	
															</>
														)
													})
												}
											
										</tbody>
											
										}
									
									</Table>
									{
                                        pages > currentPage+1?
                                        (
                                            <p style={{color:'grey',fontWeight:'400'}}> Showing {(currentPage+1)*singlePage} of <strong>{tickets.length}</strong> </p>
                                        ):
                                        (
                                            <p style={{color:'grey',fontWeight:'400'}}> Showing {tickets.length} of <strong>{tickets.length}</strong> </p>
                                        )
                                    }
									
									<ReactPaginate
                                                pageCount = {pages}
                                                previousLabel = "Previous"
                                                nextLabel = "Next"
                                                onPageChange = {changePage}
                                                containerClassName={"main"}
                                                previousLinkClassName={"prevStyle"}
                                                nextLinkClassName={"nextStyle"}
                                                disabledClassName={"disableButtons"}
                                                activeClassName={"pageActive"}
                                        />
									</div>
									</>
							   ):
							   (
								   <p className="text-center" style={{fontWeight:"bolder",color:"black"}}> 0 Tickets issued. </p>
							   )
						   }
							
						</Col>

					
				</Row>
					)
				}

				
				
			</div>
			
								
		</React.Fragment>
	);
};

export default IssueTickets;
