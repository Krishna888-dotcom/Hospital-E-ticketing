import React,{ useState, useEffect}from 'react'
import {Row,Col,Container,Table} from 'react-bootstrap'
import useCommon from '../common/useCommon'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Skeleton from '../common/Skeleton';
import useLoader from '../common/useLoader';
import {GiPayMoney} from 'react-icons/gi';
import {FcProcess} from 'react-icons/fc';
import {FaHourglassEnd} from 'react-icons/fa'
import {TiTick} from 'react-icons/ti'


const Ticket = (props) => {
    let {} = props
    let {getFormattedToday,auth} = useCommon();
    let {skeletonLoading,skeletonHandler} = useLoader();
    
    //state goes here
    let [date,setDate] = useState(getFormattedToday(new Date()));
    let [shift,setShift] = useState("");
    let [startDate,setStartDate] = useState(getFormattedToday(new Date()))
    let [tickets,setTickets] = useState([]);
    let [currentPage,setCurrentPage] = useState(0);

    let singlePage = 7;
    let pageVisited = currentPage * singlePage;


    //effect goes here
    useEffect(()=>{
        skeletonHandler(true)
        axios.get(process.env.REACT_APP_URL+"soldTickets",auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setStartDate(
                    response.data.startDate
                )
                setTickets(
                    response.data.data
                )
            }
            else
            {
                setStartDate(getFormattedToday(new Date()));
                setTickets([]);
            }
            skeletonHandler(false);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])



    const changeShift = (e)=>{
        setCurrentPage(0);
        setShift(e.target.value)
    }

    const changeDate = (e)=>{
        setCurrentPage(0);
        setDate(e.target.value)
    }

    const changePage = ({selected})=>{
        setCurrentPage(selected)
    }

    const getStatus = (val)=>{
        if(val.ticketStatus == "Pending" && val.holdingStatus == "Processing")
        {
            return(
            <td> <GiPayMoney/> </td>
            )
        }
        else if(val.ticketStatus == "Pending" && val.holdingStatus == "Completed")
        {
            return(
            <td> <FaHourglassEnd/> </td>
            )
        }
        else if(val.ticketStatus == "Running")
        {
            return (
            <td> <FcProcess/> </td>
            )
        }
        else if(val.ticketStatus == "Completed")
        {
            return (
            <td> <TiTick/> </td>
            )
        }
    }

    //building a content box
    let filtered = tickets.filter((val)=>{return val.date == date && val.ticketId.shift.startsWith(shift)});
    let totalPages = Math.ceil(filtered.length / singlePage);
    let content = filtered.slice(pageVisited,pageVisited+singlePage)
    
    return (
        <React.Fragment>
        <Container>
            <h1 className="font-weight-bold mb-2 pb-3 red" style={{color:"grey",fontWeight:"bold"}}>Tickets</h1>
            <Row>
                <Col lg={6} md={12} xs={12}>
                 
                    <div className="form-row reg__form2 ticket">
                        <div className="form-group">
                            <label>Date</label>
                            <input className="form-control" min={startDate} max={getFormattedToday(new Date())} value={date} type="date" name="startDate" onChange={(e)=>{changeDate(e)}}/>
                            </div>
                    </div>
                </Col>
                <Col lg={6} md={12} xs={12}>
                    <div className="form-row reg__form2 ticket">
                        <div className="form-group ">
                            <label> Choose Shift</label>									
                            <select  className="form-select" name="shift" onChange={(e)=>{changeShift(e)}}>
                                <option value=""> Choose shift </option>
                                <option value="Morning">Morning</option>
                                <option value="Afternoon">Afternoon</option>
                                <option value="Evening">Evening</option>
                            </select>
                        </div>
                        
                    </div>
                </Col>
            </Row>
            {
                skeletonLoading == true?
                (
                    <Skeleton/>
                ):
                (
                    filtered.length > 0?
                    (
                        <>
                            <p className="ml-1"> <small style={{color:"black",fontWeight:"bolder"}}> {filtered.length} tickets. </small> </p>
                            <Table bordered hover responsive className="table__items w-100"> 
                                <thead>
                                    <tr className="text-center">
                                        <th> S.N </th>
                                        <th>Patient Name</th>
                                        <th> Phone </th>
                                        <th> Email </th>
                                        <th>Address</th> 
                                        <th>Age</th> 
                                        <th>Gender</th> 
                                        <th>Ticket Number</th> 
                                        <th>Department</th> 
                                        <th>Date</th> 
                                        <th>Shift</th> 
                                        <th> Time </th>
                                        <th> Fee </th>
                                        <th>Status</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        content.map((val)=>{
                                            return(
                                                <tr className="text-center">
                                                    <td style={{fontWeight:"bolder"}}>{filtered.indexOf(val)+1}</td>
                                                    <td>{val.patientName}</td>
                                                    <td>{val.buyerId.phoneNumber}</td>
                                                    <td>{val.buyerId.email}</td>
                                                    <td>{val.address}</td>
                                                    <td>{val.age}</td>
                                                    <td>{val.gender}</td>
                                                    <td>{val.ticketNo}</td>
                                                    <td>{val.department}</td>
                                                    <td>{val.ticketId.date2}</td>
                                                    <td>{val.ticketId.shift}</td>
                                                    <td>{val.ticketId.startTime}-{val.ticketId.endTime}</td>
                                                    <td>Rs {val.ticketId.price}</td>
                                                    {
                                                        getStatus(val)
                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>

                                {
                                            totalPages > currentPage+1?
                                            (
                                                <p style={{color:'grey',fontWeight:'400'}}> Showing {(currentPage+1)*singlePage} of <strong>{filtered.length}</strong> </p>
                                            ):
                                            (
                                                <p style={{color:'grey',fontWeight:'400'}}> Showing {filtered.length} of <strong>{filtered.length}</strong> </p>
                                            )
                                }
                                       

                                <ReactPaginate
                                    pageCount = {totalPages}
                                    previousLabel = "Previous"
                                    nextLabel = "Next"
                                    onPageChange = {changePage}
                                    containerClassName={"main"}
                                    previousLinkClassName={"prevStyle"}
                                    nextLinkClassName={"nextStyle"}
                                    disabledClassName={"disableButtons"}
                                    activeClassName={"pageActive"}
                                />
                    </>
                    ):
                    (
                        <p className="text-center" style={{color:"grey",fontWeight:"bolder",fontSize:"18px"}}> 0 Records Found for {date}. </p>
                    )
                )
            }
       

        </Container>    
            
        </React.Fragment>
    )
}

export default Ticket
